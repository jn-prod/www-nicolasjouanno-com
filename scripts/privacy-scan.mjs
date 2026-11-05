// Contrôle de confidentialité des fichiers versionnés : noms de tiers et de mineurs
// (denylist), puis données personnelles par motif (e-mail hors contact@ et nicolas@,
// téléphone, IBAN/RIB, coordonnées), nom de l'employeur hors des pages autorisées,
// position GPS dans les images et traces GPS versionnées.
//
//   node scripts/privacy-scan.mjs
//
// La denylist n'est jamais versionnée : variable PRIVACY_DENYLIST (secret GitHub
// Actions, un terme par ligne) ou fichier PRIVACY_DENYLIST_FILE, par défaut
// ~/alfred/.privacy-denylist. Sans denylist, le contrôle échoue (fail-closed).
// Les motifs ne s'appliquent ni aux tests, ni aux attributs placeholder, ni aux domaines
// d'exemple, ni aux fichiers listés dans .privacy-allow (coordonnées publiques assumées,
// un chemin par ligne). La denylist, elle, s'applique partout.
// Les journaux de CI sont publics : seul l'emplacement est affiché, jamais le terme.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const TESTS = /(^|\/)tests?\/|\.(test|spec)\.[cm]?[jt]s$/;
const SKIP =
  /(^|\/)(pnpm-lock\.yaml|Gemfile\.lock|package-lock\.json)$|\.(jpe?g|png|webp|gif|ico|svg|pdf|woff2?|ttf|zip|gz|mp4|mov)$/i;
const PATTERNS = [
  [
    'e-mail',
    /(?<![A-Za-z0-9._%+-])(?!(?:contact|nicolas)@)[A-Za-z0-9._%+-]+@(?!(?:[a-z0-9-]+\.)*ex[ea]mple\.)[A-Za-z0-9.-]+\.[A-Za-z]{2,}/i,
  ],
  ['IBAN', /\bFR\d{2}(?: ?[A-Za-z0-9]){23}\b/i],
  ['RIB', /\b\d{5} ?\d{5} ?[A-Za-z0-9]{11} ?\d{2}\b/],
  ['téléphone', /(?<![A-Za-z0-9])(?:\+33|0)[ .-]?[1-9](?:[ .-]?\d{2}){4}(?![A-Za-z0-9])/],
  ['coordonnées', /(?<![\d.])-?\d{1,3}\.\d{4,}\s*[,;/]\s*-?\d{1,3}\.\d{4,}(?![\d.])|\b\d{1,2}°\s?\d{1,2}['′]/],
];
// L'employeur n'apparaît que sur ces pages : ni .privacy-allow ni les tests ne l'élargissent.
const EMPLOYEUR = /mgdis/i;
const EMPLOYEUR_AUTORISE = new Set([
  'work/index.md',
  '_posts/2025-09-26-paris-web-2025.md',
  'scripts/privacy-scan.mjs',
]);
const TRACES = /\.(gpx|kml|kmz|fit|tcx)$/i;
const IMAGES = /\.(jpe?g|png|webp)$/i;

// Vrai si l'image porte une latitude ou une longitude, en XMP ou en EXIF (JPEG, PNG, WebP).
const tiffAvecGps = (tiff) => {
  const lePetit = tiff.toString('latin1', 0, 2) === 'II';
  if (!lePetit && tiff.toString('latin1', 0, 2) !== 'MM') return false;
  const u16 = (position) => (lePetit ? tiff.readUInt16LE(position) : tiff.readUInt16BE(position));
  const u32 = (position) => (lePetit ? tiff.readUInt32LE(position) : tiff.readUInt32BE(position));
  const entrees = (ifd) => Array.from({ length: u16(ifd) }, (_, i) => ifd + 2 + i * 12);
  const pointeur = entrees(u32(4)).find((entree) => u16(entree) === 0x8825);
  if (pointeur === undefined) return false;
  return entrees(u32(pointeur + 8)).some((entree) => [2, 4].includes(u16(entree)));
};
const imageAvecGps = (data) => {
  if (data.includes('GPSLatitude') || data.includes('GPSLongitude')) return true;
  return [
    ['Exif\0\0', 6],
    ['eXIf', 4],
    ['EXIF', 8],
  ].some(([marqueur, saut]) => {
    for (let i = data.indexOf(marqueur); i !== -1; i = data.indexOf(marqueur, i + 1)) {
      let tiff = data.subarray(i + saut);
      if (tiff.toString('latin1', 0, 6) === 'Exif\0\0') tiff = tiff.subarray(6);
      try {
        if (tiffAvecGps(tiff)) return true;
      } catch {
        // Marqueur fortuit dans les données de l'image : pas un bloc EXIF lisible.
      }
    }
    return false;
  });
};

const listFile = process.env.PRIVACY_DENYLIST_FILE ?? join(homedir(), 'alfred', '.privacy-denylist');
const rawList = process.env.PRIVACY_DENYLIST ?? (existsSync(listFile) ? readFileSync(listFile, 'utf8') : null);
if (!rawList?.trim()) {
  console.error(`privacy : denylist introuvable (PRIVACY_DENYLIST ou ${listFile}). Contrôle refusé.`);
  process.exit(1);
}
const terms = rawList
  .split('\n')
  .map((term) => term.trim().toLowerCase())
  .filter((term) => term && !term.startsWith('#'));

const allowed = new Set(
  existsSync('.privacy-allow')
    ? readFileSync('.privacy-allow', 'utf8')
        .split('\n')
        .map((path) => path.trim())
        .filter((path) => path && !path.startsWith('#'))
    : []
);
const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const files = tracked.filter((file) => !SKIP.test(file));
const findings = [];
for (const file of tracked) {
  if (!existsSync(file)) continue;
  if (TRACES.test(file)) findings.push(`${file} trace GPS`);
  if (IMAGES.test(file) && imageAvecGps(readFileSync(file))) findings.push(`${file} position GPS dans l'image`);
}
for (const file of files) {
  if (!existsSync(file)) continue;
  const text = readFileSync(file, 'utf8');
  if (text.includes('\0')) continue;
  const checkPatterns = !TESTS.test(file) && !allowed.has(file);
  text.split('\n').forEach((line, index) => {
    const lower = line.toLowerCase();
    if (terms.some((term) => lower.includes(term))) findings.push(`${file}:${index + 1} terme de la denylist`);
    if (EMPLOYEUR.test(line) && !EMPLOYEUR_AUTORISE.has(file)) findings.push(`${file}:${index + 1} employeur`);
    if (!checkPatterns || line.includes('placeholder=')) return;
    for (const [kind, pattern] of PATTERNS) if (pattern.test(line)) findings.push(`${file}:${index + 1} ${kind}`);
  });
}

if (findings.length > 0) {
  console.error(`privacy : ${findings.length} donnée(s) à retirer avant publication :\n  ${findings.join('\n  ')}`);
  process.exit(1);
}
console.log(`privacy : ${files.length} fichiers contrôlés, rien à signaler.`);
