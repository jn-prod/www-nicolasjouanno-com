// Prépare dans Kit la campagne d'une édition de La Sortie fraîchement publiée.
//
//   node scripts/kit-broadcast.mjs [--dry-run]
//
// Lit _site/la-sortie/editions.json (produit par le build), retient les éditions en ligne
// depuis moins de RECENT_DAYS jours et crée, pour chacune, une campagne Kit en brouillon
// (send_at: null) : l'envoi reste un clic dans Kit. Idempotent : une campagne dont la
// description est déjà « La Sortie #N — mois année » n'est jamais recréée.
//
// Variables : KIT_API_KEY (secret), KIT_SEGMENT_IDS (audience, ids séparés par des
// virgules), KIT_EMAIL_TEMPLATE_ID (facultatif, sinon le modèle par défaut du compte).
import { readFileSync } from "node:fs";

const API = "https://api.kit.com/v4/broadcasts";
const RECENT_DAYS = 7;
// La Sortie #1 : les éditions antérieures (agenda mensuel) ne sont pas numérotées.
const FIRST_EDITION = "2026-09-30";
const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août",
  "septembre", "octobre", "novembre", "décembre"];

const dryRun = process.argv.includes("--dry-run");
const editionsPath = new URL("../_site/la-sortie/editions.json", import.meta.url);
const editions = JSON.parse(readFileSync(editionsPath, "utf8"))
  .editions.filter((edition) => edition.date >= FIRST_EDITION)
  .sort((a, b) => a.date.localeCompare(b.date))
  .map((edition, index) => ({ ...edition, number: index + 1 }));

const now = Date.now();
const recent = editions.filter((edition) => {
  const age = now - Date.parse(edition.date);
  return age >= 0 && age < RECENT_DAYS * 24 * 3600 * 1000;
});
if (recent.length === 0) {
  console.log("Kit : aucune édition publiée ces 7 derniers jours.");
  process.exit(0);
}

const apiKey = process.env.KIT_API_KEY;
const segmentIds = (process.env.KIT_SEGMENT_IDS ?? "")
  .split(",").map((id) => Number(id.trim())).filter(Number.isInteger).filter((id) => id > 0);
if (!apiKey || segmentIds.length === 0) {
  console.error("Kit : KIT_API_KEY et KIT_SEGMENT_IDS sont requis (jamais d'envoi à tous les abonnés).");
  process.exit(1);
}
const headers = { "X-Kit-Api-Key": apiKey, "Content-Type": "application/json" };

// La couverture vit dans le front matter, hors du contenu : sans elle, le mail n'aurait
// que la vignette Kit, qui ne s'affiche pas dans le corps.
const escapeAttribute = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;")
  .replace(/</g, "&lt;").replace(/>/g, "&gt;");
const withCover = (edition) => {
  if (!edition.image || edition.content.includes(edition.image)) return edition.content;
  const caption = edition.image_caption ? `<p><em>${edition.image_caption}</em></p>\n\n` : "";
  return `<p><img src="${edition.image}" alt="${escapeAttribute(edition.image_alt ?? edition.title)}" /></p>\n\n${caption}${edition.content}`;
};

const label = (edition) => {
  const [year, month] = edition.month.split("-").map(Number);
  return `La Sortie #${edition.number} — ${MONTHS[month - 1]} ${year}`;
};

const response = await fetch(`${API}?per_page=50`, { headers });
if (!response.ok) throw new Error(`Kit : liste des campagnes ${response.status}`);
const existing = new Set((await response.json()).broadcasts.map((broadcast) => broadcast.description));

for (const edition of recent) {
  const description = label(edition);
  if (existing.has(description)) {
    console.log(`Kit : « ${description} » existe déjà, rien à faire.`);
    continue;
  }
  const payload = {
    subject: `La Sortie #${edition.number} — ${edition.title}`,
    preview_text: edition.description,
    description,
    content: withCover(edition),
    public: false,
    published_at: edition.date,
    send_at: null,
    thumbnail_url: edition.image,
    thumbnail_alt: edition.image_alt,
    subscriber_filter: [{ all: [{ type: "segment", ids: segmentIds }], any: null, none: null }],
  };
  if (process.env.KIT_EMAIL_TEMPLATE_ID) payload.email_template_id = Number(process.env.KIT_EMAIL_TEMPLATE_ID);

  if (dryRun) {
    console.log(`Kit (dry-run) : créerait « ${payload.subject} » [${description}], ${payload.content.length} caractères, segments ${segmentIds.join(", ")}.`);
    continue;
  }
  const created = await fetch(API, { method: "POST", headers, body: JSON.stringify(payload) });
  if (!created.ok) throw new Error(`Kit : création de « ${description} » ${created.status} ${await created.text()}`);
  const { broadcast } = await created.json();
  console.log(`Kit : brouillon « ${payload.subject} » créé (id ${broadcast.id}). L'envoi se fait dans Kit.`);
}
