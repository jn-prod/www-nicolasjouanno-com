# nj.com — Hubs déclaratifs (3 catégories) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aligner nj.com sur 3 catégories = 3 hubs (Outdoor / Life / Work), hubs auto-alimentés par la catégorie + attribut `featured`, archive unique filtrable, en réduisant la maintenance à contenu constant.

**Architecture:** Site Jekyll (source `www/`, build `pnpm build:www` → `www/_site`). Les hubs listent `site.categories[cat]` via un include unique `hub-list.html`. La mise en avant vit dans le front-matter (`featured: true`). `nutrition.html`/`slow-web.html` fusionnent dans `life.html` (contenu repris + `jekyll-redirect-from`, déjà installé). `posts.html` devient l'archive filtrable (vanilla JS).

**Tech Stack:** Jekyll + Liquid, `jekyll-redirect-from`, vanilla JS (`assets/main.js`), pnpm workspace. Design system maison (classes `c-*`, `u-*`).

**Spec de référence :** `docs/superpowers/specs/2026-07-17-njcom-hubs-declaratifs-nav-ombrelle-design.md`

## Global Constraints

- **Fenêtre §22 (studio)** : pas de `git commit`/`push` du lundi au vendredi 08:00–13:00 et 14:00–20:00 (Europe/Paris). Créneaux libres : 06:00–07:59, 13:00–13:59, ≥20:00, week-ends, fériés FR. Vérifier avec `bash /root/corp-ai/tools/scripts/fenetre-protegee.sh` (exit 1 = libre). Écrire les fichiers est toujours permis ; **seuls les commits sont gated**. Si en fenêtre protégée, exécuter les tâches et **différer les commits** groupés au prochain créneau.
- **Build** : `pnpm build:www` (depuis la racine du repo `/root/www-nicolasjouanno-com`). Sortie : `www/_site`.
- **3 catégories canoniques uniquement** dans `_posts` : `Outdoor`, `Life`, `Work`. Aucune autre.
- **Slugs de filtre/hash** : `outdoor`, `life`, `work` (= `catégorie | slugify`).
- **Design system** : n'utiliser que les classes/tokens existants (`c-*`, `u-*`). Pas de variable CSS spécifique à un composant (règle `AGENTS.md`).
- **Copy en français.** Ne pas supprimer d'article (`_posts`). Exception multi-catégorie assumée : `sans-gluten-sport-endurance-velo-coeliaque` = `[Outdoor, Life]`.

---

### Task 1: Normaliser les catégories + poser `featured` dans `_posts`

**Files:**
- Modify: `www/_posts/*.md` (front-matter `categories` + `featured`)
- (scripts jetables exécutés depuis `www/`)

**Interfaces:**
- Produces : `site.categories.Outdoor` (~41), `site.categories.Life` (~9), `site.categories.Work` (1) ; `featured: true` sur 9 articles Outdoor (dont `sans-gluten-sport-endurance`, aussi Life).

- [ ] **Step 1: Écrire le script de remap des catégories** (depuis `www/`)

Créer `/tmp/remap-cats.py` :

```python
import glob, re
CATMAP = {
    'Sport': 'Outdoor', 'Outdoor': 'Outdoor',
    'Nutrition': 'Life', 'Slow web': 'Life', 'Sans gluten': 'Life', 'Perso': 'Life', 'Life': 'Life',
    'Tech & IA': 'Work', 'Work': 'Work',
}
for path in glob.glob('_posts/*.md'):
    lines = open(path, encoding='utf-8').readlines()
    if not lines or lines[0].strip() != '---':
        continue
    end = next(i for i in range(1, len(lines)) if lines[i].strip() == '---')
    out, i, changed = [], 1, False
    while i < end:
        if re.match(r'^categories:\s*$', lines[i]):
            j, items = i + 1, []
            while j < end and re.match(r'^\s*-\s*', lines[j]):
                items.append(re.sub(r'^\s*-\s*', '', lines[j]).strip())
                j += 1
            mapped = []
            for it in items:
                m = CATMAP.get(it, it)
                if m not in mapped:
                    mapped.append(m)
            out.append('categories:\n')
            out += [f'  - {m}\n' for m in mapped]
            changed, i = True, j
            continue
        out.append(lines[i]); i += 1
    if changed:
        open(path, 'w', encoding='utf-8').writelines([lines[0]] + out + lines[end:])
        print('cats', path)
```

- [ ] **Step 2: Lancer le remap**

Run: `cd /root/www-nicolasjouanno-com/www && python3 /tmp/remap-cats.py`
Expected: liste des fichiers modifiés (~47 lignes `cats _posts/...`).

- [ ] **Step 3: Vérifier qu'il ne reste que 3 catégories**

Run:
```sh
cd /root/www-nicolasjouanno-com/www
grep -rhA1 '^categories:' _posts/ | grep -E '^\s*-' | sort | uniq -c | sort -rn
```
Expected: seulement `- Outdoor`, `- Life`, `- Work` (aucun `Sport`, `Nutrition`, `Slow web`, `Sans gluten`, `Perso`, `Tech & IA`). `Outdoor` ≈ 41, `Life` ≈ 9, `Work` = 1.

- [ ] **Step 4: Écrire le script `featured`**

Créer `/tmp/set-featured.py` :

```python
import glob, re, os
TARGETS = {
  '/competition-versus-entrainement.html', '/enduro-vtt-pilote-checklist-materiel.html',
  '/entrainement-vtt.html', '/ma-megavalanche-2013-alpe-dhuez.html',
  '/ou-randonner-vtt-bretagne.html', '/pourquoi-tombons-nous.html',
  '/premier-trail.html', '/sport-solitude.html',
  '/sans-gluten-sport-endurance-velo-coeliaque.html',
}
def url_of(path, fm):
    m = re.search(r'^permalink:\s*"?([^"\n]+)"?\s*$', fm, re.M)
    if m:
        return m.group(1).strip()
    slug = re.sub(r'^\d{4}-\d{2}-\d{2}-', '', os.path.basename(path))[:-3]
    return '/' + slug + '.html'
n = 0
for path in glob.glob('_posts/*.md'):
    lines = open(path, encoding='utf-8').readlines()
    if not lines or lines[0].strip() != '---':
        continue
    end = next(i for i in range(1, len(lines)) if lines[i].strip() == '---')
    fm = ''.join(lines[1:end])
    if url_of(path, fm) in TARGETS and not re.search(r'^featured:\s*true', fm, re.M):
        lines.insert(end, 'featured: true\n')
        open(path, 'w', encoding='utf-8').writelines(lines)
        print('featured', path); n += 1
print('TOTAL featured =', n)
```

- [ ] **Step 5: Lancer + vérifier 9 featured**

Run: `cd /root/www-nicolasjouanno-com/www && python3 /tmp/set-featured.py`
Expected: `TOTAL featured = 9`. Si < 9, identifier le(s) manquant(s) (`grep -rl 'permalink' _posts` pour les cas de permalink atypique) et ajouter `featured: true` à la main.

- [ ] **Step 6: Build de contrôle**

Run: `cd /root/www-nicolasjouanno-com && pnpm build:www`
Expected: build sans erreur.

- [ ] **Step 7: Commit** (si fenêtre §22 libre)

```bash
cd /root/www-nicolasjouanno-com
git add www/_posts
git commit -m "refactor(nj): normalise categories to Outdoor/Life/Work + featured attribute"
```

---

### Task 2: Include `hub-list.html` + branchement `results.html` (Outdoor)

**Files:**
- Create: `www/_includes/components/hub-list.html`
- Modify: `www/results.md` (remplacer les listes de liens en dur + supprimer l'auto-list finale)

**Interfaces:**
- Consumes : `site.categories[cat]`, `_includes/components/post.html` (existant).
- Produces : include `hub-list.html` params `category` (requis), `limit` (défaut 5), `archive_url` (optionnel).

- [ ] **Step 1: Créer l'include**

Créer `www/_includes/components/hub-list.html` :

```liquid
{%- comment -%} params: category (requis), limit (défaut 5), archive_url (optionnel) {%- endcomment -%}
{%- assign posts = site.categories[include.category] -%}
{%- assign lim = include.limit | default: 5 -%}

{%- assign highlights = posts | where: "featured", true -%}
{%- if highlights.size > 0 -%}
  <h2>À lire en premier</h2>
  <ul class="u-list c-section__post-list">
    {%- for post in highlights -%}
      <li class="c-section__post-item">{%- include /components/post.html -%}</li>
    {%- endfor -%}
  </ul>
{%- endif -%}

{%- assign rest = posts | where_exp: "p", "p.featured != true" -%}
{%- assign shown = rest | slice: 0, lim -%}
<h2>Derniers articles</h2>
<ul class="u-list c-section__post-list">
  {%- for post in shown -%}
    <li class="c-section__post-item">{%- include /components/post.html -%}</li>
  {%- endfor -%}
</ul>

{%- if include.archive_url and rest.size > shown.size -%}
  <p><a href="{{ include.archive_url }}">Voir tous les articles ({{ posts.size }}) →</a></p>
{%- endif -%}
```

- [ ] **Step 2: Remplacer la section « Pour aller plus loin » de `results.md`**

Dans `www/results.md`, remplacer le bloc des lignes 16 à 34 (de `## Pour aller plus loin` jusqu'à la ligne `**Le projet :** …` incluse) par :

```markdown
## Articles sport & outdoor

{% include components/hub-list.html category="Outdoor" archive_url="/posts.html#outdoor" %}

**Le projet :** [{{ site.projects.vtt_bzh.name }}]({{ site.projects.vtt_bzh.url }}) — calendrier des randos VTT en Bretagne, 12 000 vues/mois.
```

(La `<aside>` newsletter juste en dessous et la section `## Palmarès cycliste` restent inchangées.)

- [ ] **Step 3: Supprimer l'auto-list finale de `results.md`**

Supprimer le bloc `## Tous les articles sport & outdoor` et son `<ul>` (lignes ~201–207, de `## Tous les articles sport & outdoor` jusqu'au `</ul>` final). Il est remplacé par le lien « Voir tous → » de l'include.

- [ ] **Step 4: Build**

Run: `cd /root/www-nicolasjouanno-com && pnpm build:www`
Expected: build sans erreur.

- [ ] **Step 5: Vérifier le rendu Outdoor**

Run:
```sh
cd /root/www-nicolasjouanno-com/www/_site
grep -c "À lire en premier" results.html          # attendu : 1
grep -c "Derniers articles" results.html           # attendu : 1
grep -o 'href="/posts.html#outdoor"' results.html  # attendu : présent
grep -c "c-section__post-item" results.html        # attendu : 9 featured + jusqu'à 5 récents
```
Expected: zone featured (9), derniers (≤5), lien « Voir tous » vers `/posts.html#outdoor`.

- [ ] **Step 6: Commit** (si fenêtre libre)

```bash
cd /root/www-nicolasjouanno-com
git add www/_includes/components/hub-list.html www/results.md
git commit -m "feat(nj): hub-list include + wire Outdoor hub (results)"
```

---

### Task 3: Brancher `work.html` (catégorie Work)

**Files:**
- Modify: `www/work.md` (ajouter le bloc articles Work ; conserver prose/projets + lien conférence en dur)

**Interfaces:**
- Consumes : include `hub-list.html` (Task 2), `site.categories.Work`.

- [ ] **Step 1: Ajouter le bloc articles à `work.md`**

À la fin du contenu de `www/work.md` (avant l'éventuelle `<aside>` newsletter finale, sinon en fin de fichier), ajouter :

```markdown
## Articles tech & IA

{% include components/hub-list.html category="Work" archive_url="/posts.html#work" %}
```

Ne rien retirer d'autre : la prose de positionnement, la liste de projets et le lien vers la conférence web-components restent en dur.

- [ ] **Step 2: Build**

Run: `cd /root/www-nicolasjouanno-com && pnpm build:www`
Expected: build sans erreur.

- [ ] **Step 3: Vérifier**

Run:
```sh
cd /root/www-nicolasjouanno-com/www/_site
grep -c "Articles tech" work.html                 # attendu : 1
grep -o 'jai-tue-mon-saas-reconstruit-en-agent-ia' work.html | head -1   # l'article Work listé
grep -c "conference-les-web-components" work.html  # attendu : ≥1 (lien conférence conservé)
```
Expected: bloc Work présent avec l'article IA ; lien conférence toujours là.

- [ ] **Step 4: Commit** (si fenêtre libre)

```bash
cd /root/www-nicolasjouanno-com
git add www/work.md
git commit -m "feat(nj): wire Work hub (Tech & IA articles)"
```

---

### Task 4: Fusionner Nutrition + Slow web dans `life.html`

**Files:**
- Modify: `www/life.md` (réécriture : intro + sections reprises + hub-list Life + redirect_from)
- Delete: `www/nutrition.md`, `www/slow-web.md`

**Interfaces:**
- Consumes : include `hub-list.html`, `site.categories.Life`.
- Produces : redirections 301 `/nutrition.html`, `/slow-web.html`, `/sans-gluten.html` → `/life.html`.

- [ ] **Step 1: Réécrire `www/life.md`**

Remplacer tout le contenu de `www/life.md` par :

```markdown
---
layout: page
title: Van life, sans gluten & slow web — le perso de Nicolas Jouanno
description: "En dehors du sport : alimentation sans gluten (parent d'un enfant cœliaque), van life en famille en Europe, et un rapport sobre au numérique — slow web et side projects."
permalink: /life.html
redirect_from:
  - /nutrition.html
  - /slow-web.html
  - /sans-gluten.html
---

# Life

Ce qui me fait avancer en dehors du sport : **alimentation sans gluten**, **van life** en famille à travers l'Europe, et un **rapport sobre au numérique** — à vitesse humaine. _(Le sport et l'outdoor ont leur [propre coin](/results.html).)_

## 🌾 Nutrition & sans gluten {#nutrition}

Parent d'un enfant **cœliaque** et ancien cycliste pro, je vis la nutrition des deux côtés : le sans-gluten du quotidien et le ravitaillement d'effort. Des repères concrets, du testé-en-vrai — pas un avis médical.

<aside class="c-card c-card--flat c-card--medium" role="note">
  <p>ℹ️ <strong>Ceci n'est pas un avis médical.</strong> Le diagnostic de la maladie cœliaque relève d'un médecin (et il ne faut <strong>pas</strong> supprimer le gluten avant les tests, sous peine de les fausser). Références fiables : <a href="https://www.ameli.fr/assure/sante/themes/intolerance-gluten-maladie-coeliaque">ameli.fr</a> et l'<a href="https://www.afdiag.fr/">AFDIAG</a>.</p>
</aside>

<aside class="c-card c-card--primary c-card--large c-callout">
  <p class="c-callout__title">🌾 Gluten ou pas gluten ?</p>
  <p class="c-callout__text">Un quiz pour s'entraîner à repérer le gluten, aliment par aliment. Une façon ludique d'aiguiser le réflexe étiquette, en famille ou par curiosité.</p>
  <a href="/apps/gluten-not-gluten/" class="c-button c-button--light">Lancer le quiz →</a>
</aside>

## 💻 Slow web {#slow-web}

Depuis 2008, je publie sur **mon propre site**, pas sur une plateforme louée — parce qu'un site qu'on possède est un **coffre** : il ne disparaît pas le jour où une plateforme ferme ou change son algorithme. C'est le **slow web** : un web à vitesse humaine, durable, sans pub ni pistage. Je bricole mes propres outils, et le soir, en [side project](/work.html), je construis [feezify](/feezify.html), un copilote d'entraînement IA-native.

## Tous les articles

{% include components/hub-list.html category="Life" archive_url="/posts.html#life" %}

<aside class="c-card c-card--neutral c-card--large u-spacing--block-start-medium">
  <h2>Suivre</h2>
  <p>Van life, minimalisme, alimentation sans gluten — si ça vous parle, je le raconte au fil de l'eau dans ma newsletter.</p>
  {% include /plugins/newsletter.html %}
</aside>

<div class="u-text--center">
  <ul class="u-flex u-flex--center u-list">
    <li>
      <a href="{{ site.author.instagram }}" class="c-button c-button--icon c-button--large" aria-label="Instagram — @bynicolasjd" target="_blank" rel="noopener">
        <span class="c-icon">{% include icons/instagram.svg %}</span>
      </a>
    </li>
    <li>
      <a href="{{ site.author.youtube }}" class="c-button c-button--icon c-button--large" aria-label="YouTube — @byNicolasJD" target="_blank" rel="noopener">
        <span class="c-icon">{% include icons/youtube.svg %}</span>
      </a>
    </li>
  </ul>
</div>
```

- [ ] **Step 2: Supprimer les 2 fichiers fusionnés**

Run: `cd /root/www-nicolasjouanno-com/www && git rm nutrition.md slow-web.md`
(ou `rm` si pas encore suivis dans l'index — ils le sont.)

- [ ] **Step 3: Build**

Run: `cd /root/www-nicolasjouanno-com && pnpm build:www`
Expected: build sans erreur.

- [ ] **Step 4: Vérifier fusion + redirections**

Run:
```sh
cd /root/www-nicolasjouanno-com/www/_site
grep -c 'id="nutrition"' life.html      # attendu : 1
grep -c 'id="slow-web"' life.html       # attendu : 1
grep -c "gluten-not-gluten" life.html   # attendu : ≥1 (callout app repris)
# redirections générées par jekyll-redirect-from :
grep -o '/life.html' nutrition.html | head -1   # attendu : présent (stub redirect)
grep -o '/life.html' slow-web.html | head -1    # attendu : présent
grep -o '/life.html' sans-gluten.html | head -1 # attendu : présent
```
Expected: sections nutrition/slow-web présentes dans life ; `nutrition.html`, `slow-web.html`, `sans-gluten.html` sont des redirections vers `/life.html`.

- [ ] **Step 5: Commit** (si fenêtre libre)

```bash
cd /root/www-nicolasjouanno-com
git add www/life.md
git rm www/nutrition.md www/slow-web.md
git commit -m "feat(nj): merge Nutrition + Slow web into Life hub (+301 redirects)"
```

---

### Task 5: `posts.html` filtrable + JS

**Files:**
- Modify: `www/posts.md` (boutons de filtre + `data-category` multi-slug)
- Modify: `www/assets/main.js` (logique de filtre)

**Interfaces:**
- Consumes : `site.posts`, `_includes/components/post.html`.
- Produces : filtre client par `#hash` (`#outdoor`/`#life`/`#work`), cible des liens « Voir tous → » des hubs.

- [ ] **Step 1: Réécrire le corps de `www/posts.md`**

Remplacer le `<ul>…site.posts…</ul>` par :

```liquid
<div class="c-filters" role="group" aria-label="Filtrer par domaine">
  <button type="button" data-filter="all" aria-pressed="true">Tous</button>
  <button type="button" data-filter="outdoor" aria-pressed="false">Outdoor</button>
  <button type="button" data-filter="life" aria-pressed="false">Life</button>
  <button type="button" data-filter="work" aria-pressed="false">Work</button>
</div>

<ul class="u-list c-section__post-list" id="all-posts">
  {%- for post in site.posts -%}
    {%- assign slugs = "" -%}
    {%- for c in post.categories -%}
      {%- assign cslug = c | slugify -%}
      {%- assign slugs = slugs | append: cslug | append: ' ' -%}
    {%- endfor -%}
    <li class="c-section__post-item" data-category="{{ slugs | strip }}">{%- include /components/post.html -%}</li>
  {%- endfor -%}
</ul>
```

- [ ] **Step 2: Ajouter la logique de filtre à `www/assets/main.js`**

À la fin de `www/assets/main.js`, ajouter :

```js
const setupFilters = () => {
  const container = document.querySelector('.c-filters');
  const list = document.getElementById('all-posts');
  if (!container || !list) return;
  const items = Array.from(list.querySelectorAll('[data-category]'));
  const buttons = Array.from(container.querySelectorAll('button[data-filter]'));

  const apply = (filter) => {
    items.forEach((li) => {
      const cats = (li.dataset.category || '').split(' ');
      li.hidden = !(filter === 'all' || cats.includes(filter));
    });
    buttons.forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.filter === filter))
    );
    history.replaceState(null, '', filter === 'all' ? location.pathname : '#' + filter);
  };

  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter)));

  const initial = (location.hash || '').replace('#', '');
  apply(buttons.some((b) => b.dataset.filter === initial) ? initial : 'all');
};

document.addEventListener('DOMContentLoaded', setupFilters);
```

- [ ] **Step 3: Build**

Run: `cd /root/www-nicolasjouanno-com && pnpm build:www`
Expected: build sans erreur.

- [ ] **Step 4: Vérifier le balisage généré**

Run:
```sh
cd /root/www-nicolasjouanno-com/www/_site
grep -c 'class="c-filters"' posts.html                      # attendu : 1
grep -o 'data-filter="[a-z]*"' posts.html | sort -u          # attendu : all, life, outdoor, work
grep -o 'data-category="outdoor life"' posts.html | head -1  # article multi présent (2 slugs)
grep -c 'setupFilters' assets/main.js                        # attendu : présent
```
Expected: 4 boutons, `data-category` multi-slug sur l'article partagé, JS présent.

- [ ] **Step 5: Vérifier la dégradation sans JS (lecture)**

Confirmer par lecture de `posts.html` qu'**aucun** `<li>` n'a d'attribut `hidden` en dur (le masquage est uniquement posé par JS). Expected: aucun `hidden` statique.

- [ ] **Step 6: Commit** (si fenêtre libre)

```bash
cd /root/www-nicolasjouanno-com
git add www/posts.md www/assets/main.js
git commit -m "feat(nj): filterable posts archive (Outdoor/Life/Work) with hash deep-links"
```

---

### Task 6: Footer nav réconcilié + repointage des liens internes

**Files:**
- Modify: `www/_layouts/default.html` (footer : 5 → 3 hubs)
- Modify: `www/index.md`, `www/work.md` (liens nutrition/slow-web → life)

**Interfaces:**
- Consumes : rien de nouveau. Aligne le footer sur le header (Outdoor/Life/Work).

- [ ] **Step 1: Réconcilier le footer de `default.html`**

Dans `www/_layouts/default.html`, remplacer la liste du footer (les 5 `<li>` Outdoor/Nutrition/Life/Work/Slow web) par les 3 hubs :

```html
        <ul class="u-flex u-flex--center u-list">
          <li><a href="{{ site.url }}/results.html">Outdoor</a></li>
          <li><a href="{{ site.url }}/life.html">Life</a></li>
          <li><a href="{{ site.url }}/work.html">Work</a></li>
        </ul>
```

- [ ] **Step 2: Repointer les liens dans `index.md`**

Dans `www/index.md` : remplacer `href="/nutrition.html"` → `href="/life.html#nutrition"` et les deux occurrences `/slow-web.html` → `/life.html#slow-web`.

Run pour repérer :
```sh
cd /root/www-nicolasjouanno-com/www && grep -n 'nutrition.html\|slow-web.html' index.md
```
Appliquer le remplacement sur chaque ligne trouvée.

- [ ] **Step 3: Repointer le lien slow-web dans `work.md`**

Dans `www/work.md`, remplacer `href="/slow-web.html"` → `href="/life.html#slow-web"`.

- [ ] **Step 4: Build**

Run: `cd /root/www-nicolasjouanno-com && pnpm build:www`
Expected: build sans erreur.

- [ ] **Step 5: Vérifier footer + absence de liens directs morts**

Run:
```sh
cd /root/www-nicolasjouanno-com/www/_site
grep -o 'results.html\|/life.html\|/work.html' index.html | sort -u
# le footer d'une page quelconque expose exactement 3 hubs :
grep -oE '/(results|life|work|nutrition|slow-web)\.html' index.html | sort | uniq -c
# plus aucun lien direct vers /nutrition.html ou /slow-web.html (hors redirections stub) :
grep -rl 'href="/nutrition.html"\|href="/slow-web.html"' *.html | grep -vE '^(nutrition|slow-web)\.html$'
```
Expected: footer = Outdoor/Life/Work ; dernière commande = aucune sortie (plus de lien direct vers les pages fusionnées).

- [ ] **Step 6: Commit** (si fenêtre libre)

```bash
cd /root/www-nicolasjouanno-com
git add www/_layouts/default.html www/index.md www/work.md
git commit -m "feat(nj): reconcile footer to 3 hubs + repoint internal links to Life"
```

---

### Task 7: Vérification d'intégration finale

**Files:** aucun (contrôle).

- [ ] **Step 1: Build propre depuis zéro**

Run: `cd /root/www-nicolasjouanno-com && rm -rf www/_site && pnpm build:www`
Expected: build sans erreur, `www/_site` régénéré.

- [ ] **Step 2: Dérouler la checklist du spec**

Run:
```sh
cd /root/www-nicolasjouanno-com/www/_site
echo "— catégories propres —"; cd ../ && grep -rhA1 '^categories:' _posts/ | grep -E '^\s*-' | sort -u; cd _site
echo "— hubs —"; for h in results life work; do echo "[$h]"; grep -c "Derniers articles" $h.html; done
echo "— redirections —"; for r in nutrition slow-web sans-gluten; do printf "%s -> " $r; grep -o '/life.html' $r.html | head -1; done
echo "— filtre —"; grep -o 'data-filter="[a-z]*"' posts.html | sort -u
echo "— article multi —"; grep -o 'data-category="outdoor life"' posts.html | head -1
```
Expected: catégories = {Outdoor, Life, Work} ; 3 hubs avec « Derniers articles » ; 3 redirections vers `/life.html` ; 4 filtres ; article multi présent.

- [ ] **Step 3: Vérification manuelle du filtre (navigateur)**

Servir localement (`cd /root/www-nicolasjouanno-com && pnpm --filter='website' dev`), ouvrir `/posts.html`, cliquer chaque filtre (Outdoor/Life/Work/Tous), et ouvrir `/posts.html#life` : le filtre Life doit être pré-appliqué. Désactiver JS → tous les articles visibles.

- [ ] **Step 4: Commit du plan/spec + clôture** (si fenêtre libre)

```bash
cd /root/www-nicolasjouanno-com
git add docs/superpowers
git commit -m "docs(nj): spec + plan hubs 3 catégories"
```

---

## Self-review (couverture spec)

- §1 taxonomie 3 cat → Task 1. §2 nav footer → Task 6. §3 include featured → Task 2. §3bis jeu featured → Task 1 (step 4-5). §4 posts.html filtre → Task 5. §5 fusion Life + redirections → Task 4. §6 application par page → Tasks 2-6. Vérification → Task 7.
- Pas de placeholder : tout le code (include, life.md, JS, scripts) est fourni en entier.
- Cohérence des noms : `hub-list.html` / params `category`,`limit`,`archive_url` identiques Tasks 2-4 ; slugs `outdoor/life/work` identiques Tasks 1,5,6 ; `setupFilters` défini et appelé Task 5.
