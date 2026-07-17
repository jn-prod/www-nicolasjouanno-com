# nj.com — Hubs déclaratifs & navigation resserrée (3 hubs)

> Design en cours de validation, 2026-07-17. Périmètre **mécanique** : réduire la maintenance à
> contenu constant. Aucun **article** supprimé, aucun repositionnement éditorial (autre chantier).
> Les pages-hub `nutrition.html` / `slow-web.html` sont **fusionnées** dans `life.html` (contenu
> repris + redirections), pas supprimées.

## Problème

nj.com = ~60 URLs indexées, ~47 articles. La **profondeur** (les articles) ne coûte rien à maintenir
(pages statiques). Le coût vient de :

1. **Listes de liens tenues à la main** dans les hubs (surtout `results.html` : « Pour aller plus
   loin », ~9 liens choisis à la main au-dessus d'une liste auto déjà présente).
2. **Trop de surfaces** : 5 pages-hub (Outdoor, Nutrition, Life, Slow web, Work) pour 3 identités,
   dont `life.html` réduit à un **routeur** vers Nutrition/Slow web.
3. **Nav header ↔ footer désynchronisés** (header 3 rubriques, footer 5).

Taxonomie sale en prime : `Sans gluten` (2) et `Perso` (2) = les mêmes 2 articles, non catégorisés
`Nutrition` (orphelins) ; `Tech & IA` (1) sans hub.

## Objectif

Rendre les hubs **100 % déclaratifs** et **aligner catégories = hubs = 3** : `Outdoor`, `Life`,
`Work`. L'organisation vit dans le **front-matter des articles** (`categories` + `featured`), pas
dans des listes de liens sur les pages. Ajouter / mettre en avant un article = éditer **son
front-matter**, jamais une page-hub.

## Non-objectifs

- Supprimer des **articles** (les 47 restent ; on ne touche pas à `_posts` au-delà des `categories`
  et `featured`).
- Repositionner nj.com sur l'identité tech-IA (resserrer la breadth) — décision stratégique séparée.
- Toucher au grand nettoyage des **redirections legacy** (ça, c'est le chantier Cloudflare). On ajoute
  seulement 2 redirections de pages (nutrition/slow-web → life).

## Design

### 1. Taxonomie canonique — 3 catégories = 3 hubs

| Catégorie | ~Nb | Hub               | Slug      |
|-----------|----:|-------------------|-----------|
| `Outdoor` | 41  | `results.html`    | `outdoor` |
| `Life`    | ~9  | `life.html`       | `life`    |
| `Work`    | 1   | `work.html`       | `work`    |

Renommages / fusions de `categories` dans les `_posts` :
- `Sport` → **`Outdoor`** (41 articles).
- `Nutrition` (3) + `Slow web` (4) + `Sans gluten`/`Perso` (2) → **`Life`** (~9). Les libellés
  `Nutrition`, `Slow web`, `Sans gluten`, `Perso` sont **retirés**.
- `Tech & IA` (1) → **`Work`**.
- **Exception multi-catégorie assumée** : `sans-gluten-sport-endurance-velo-coeliaque` reste
  `[Outdoor, Life]` (mis en avant dans les deux hubs — choix fondateur). Il compte dans les 41
  Outdoor et dans les ~9 Life.
- Règle : **toute catégorie a un hub, tout hub a une catégorie.** Un article = une catégorie, sauf
  l'exception ci-dessus.

### 2. Navigation — 3 hubs, header == footer

- **Header** : `Outdoor · Life · Work · [Suivre]` (inchangé).
- **Footer réconcilié** sur les mêmes 3 hubs + liens utilitaires (mentions, contact). Il **cesse**
  d'exposer Nutrition/Slow web. Header et footer tirent des mêmes 3 entrées → plus de dérive.
- **`life.html` devient un hub normal** (comme Outdoor et Work), plus un routeur : il porte la
  catégorie `Life`.

### 3. Hubs déclaratifs — attribut `featured` + un seul include

La mise en avant vit dans le **front-matter** (`featured: true`, booléen). Include
`_includes/components/hub-list.html` :

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

Appel type : `{% include components/hub-list.html category="Outdoor" archive_url="/posts.html#outdoor" %}`.

Comportement :
- **« À lire en premier »** : les `featured: true` de la catégorie (épinglés, hors recency). Ne
  s'affiche que s'il y en a.
- **« Derniers articles »** : les **5 plus récents** de la catégorie, **hors featured**.
  `site.categories[cat]` est trié récent→ancien → ordre gratuit, sans plugin.
- **Lien archive** : « Voir tous les articles → » vers `posts.html` filtrée (§4), ssi il reste des
  articles au-delà des featured + 5.

**Ordre des featured** : ordre naturel (récent→ancien). Évolution possible sans casse : entier
`featured: N` + `sort`.

### 3bis. Jeu de `featured` initial — repris des liens en dur actuels

Pour ne rien perdre à la bascule, on marque `featured: true` **exactement les articles aujourd'hui
liés en dur dans les hubs** :

- **Outdoor** (9) : `competition-versus-entrainement`, `tout-sur-lenduro`
  (`/enduro-vtt-pilote-checklist-materiel`), `entrainement-vtt`, `ma-megavalanche-2013-alpe-dhuez`,
  `ou-randonner-vtt-bretagne`, `pourquoi-tombons-nous`, `premier-trail`, `sport-solitude`, **et**
  `sans-gluten-sport-endurance` (aussi Life → featured dans les deux hubs).
- **Life** : `sans-gluten-sport-endurance` (seul article ex-lié en dur qui atterrit dans Life).
  Nutrition et Slow web n'avaient **aucun** lien en dur.
- **Work** : aucun. La **conférence web-components** (`conference-les-web-components-et-accessibilite`)
  est une **page événement** (`_events`), pas un article `_posts` → hors modèle featured. Elle **reste
  un lien en dur dans `work.md`** (page de positionnement, curée à la main).

Après bascule : retirer la liste de liens en dur de `results.md` (le lien conférence, lui, reste
dans `work.md`).

### 4. Archive unique filtrable — on reprend `posts.html` (existante)

`posts.html` **existe déjà** et liste **tous les articles** (`{% for post in site.posts %}`) ; elle
est liée depuis la home. On la **reprend** comme archive unique + **filtre par catégorie** (3 :
Outdoor / Life / Work). Chaque hub y pointe pré-filtré via ancre de hash.

**Balisage** (Liquid) — chaque item porte **tous** ses slugs de catégorie :
```liquid
<div class="c-filters" role="group" aria-label="Filtrer par domaine">
  <button data-filter="all" aria-pressed="true">Tous</button>
  <button data-filter="outdoor">Outdoor</button>
  <button data-filter="life">Life</button>
  <button data-filter="work">Work</button>
</div>
<ul class="u-list c-section__post-list" id="all-posts">
  {%- for post in site.posts -%}
    {%- assign slugs = "" -%}
    {%- for c in post.categories -%}
      {%- assign cslug = c | slugify -%}
      {%- assign slugs = slugs | append: cslug | append: ' ' -%}
    {%- endfor -%}
    <li class="c-section__post-item" data-category="{{ slugs | strip }}">
      {%- include /components/post.html -%}
    </li>
  {%- endfor -%}
</ul>
```

`data-category` porte tous les slugs → l'article multi-catégorie (`sans-gluten-sport-endurance`) est
trouvé par **les deux** filtres (Outdoor et Life).

**Filtre = vanilla JS** (`assets/main.js`, cohérent avec l'ethos slow web, pas de framework) :
- clic → pour chaque `<li>`, visible si `filter === "all"` **ou** si le slug est **contenu** dans
  `data-category.split(" ")` ; les autres passent en `hidden` ; MAJ `aria-pressed` + `#hash`.
- au chargement, lit `location.hash` (`#outdoor`…) et applique le filtre — c'est ce qui fait marcher
  les liens « Voir tous → ».
- **Amélioration progressive** : sans JS, aucun `hidden` → **tous les articles visibles** (dégradation
  propre, contenu indexable).

### 5. Fusion Nutrition + Slow web dans `life.html`

`life.html` absorbe les deux ex-hubs. **Contenu repris, pas supprimé** :
- Le texte d'intro de `nutrition.md` (disclaimer cœliaque, callout de l'app quiz gluten
  `/apps/gluten-not-gluten/`) → section `#nutrition` de `life.html`.
- Le manifeste de `slow-web.md` → section `#slow-web` de `life.html`.
- Puis **un seul bloc d'articles** (unifié) : `{% include components/hub-list.html category="Life"
  archive_url="/posts.html#life" %}` (les articles Nutrition + Slow web mêlés, récent→ancien).

**Redirections** (préserver le SEO / les liens entrants) — via `jekyll-redirect-from`, sur `life.md` :
```yaml
redirect_from:
  - /nutrition.html
  - /slow-web.html
  - /sans-gluten.html   # portait déjà cette redirection, on la conserve
```
→ supprimer les fichiers `nutrition.md` et `slow-web.md`.

**Liens internes à repointer** vers `/life.html` (ancre possible `#nutrition` / `#slow-web`) :
`index.md` (2 boutons + 1 lien), `work.md` (1 lien slow-web), footer (traité en §2), et les 2
boutons self-référents de `life.md` (disparaissent, Life EST le hub).

> ⚠️ **Compromis SEO assumé** : `nutrition.html` rankait sur « sans gluten » (audience parent
> d'enfant cœliaque). La redirection 301 **préserve le jus**, mais la landing dédiée disparaît au
> profit d'une section dans Life. Choix fondateur.

### 6. Application par page

| Page             | Après                                                                 |
|------------------|-----------------------------------------------------------------------|
| `results.html`   | intro conservée + `hub-list` (Outdoor) ; **liste de liens en dur supprimée** (migrée en `featured`) |
| `life.html`      | intro perso + sections `#nutrition` & `#slow-web` (texte repris) + `hub-list` (Life) ; `redirect_from` nutrition/slow-web/sans-gluten |
| `work.html`      | prose/projets conservés + `hub-list` (Work) ; lien conférence conservé en dur |
| `nutrition.md`   | **supprimé** (→ redirige vers life)                                    |
| `slow-web.md`    | **supprimé** (→ redirige vers life)                                    |
| `posts.html`     | **reprise** : boutons de filtre (3) + `data-category` multi-slug + JS filtre/hash |
| `default.html`   | footer nav réconcilié (3 hubs, source unique header/footer)           |
| `assets/main.js` | logique de filtre `posts.html` (toggle `hidden`, `aria-pressed`, hash)|
| `index.md`, `work.md` | liens nutrition/slow-web repointés vers `/life.html`             |
| `_posts/*.md`    | `categories` : `Sport`→`Outdoor`, `Nutrition`/`Slow web`/`Sans gluten`/`Perso`→`Life`, `Tech & IA`→`Work` ; `featured: true` sur le jeu initial (§3bis) |

## Flux de données

`_posts/<article>.md` (`categories`, `featured`) → `site.categories[cat]` (trié récent→ancien par
Jekyll) → `hub-list.html` (zone featured + slice 5) → les 3 hubs ; `posts.html` via `site.posts` +
filtre. **Aucune liste d'articles dupliquée sur une page** (seule exception hors-modèle : le lien
conférence en dur dans `work.md`).

## Cas limites

- **0 featured** dans une catégorie → la zone « À lire en premier » ne s'affiche pas.
- **featured + 5 derniers ≥ total catégorie** → pas de lien « Voir tous ».
- **Discipline `featured`** : pas de contrainte technique, mais au-delà d'une poignée par hub « À lire
  en premier » perd son sens. Le jeu initial (§3bis) reprend la curation existante telle quelle.
- **Article multi-catégories** : un seul cas assumé (`sans-gluten-sport-endurance` = `[Outdoor, Life]`)
  → apparaît dans les deux hubs ; le filtre gère le multi-slug (§4). Tout autre article = mono-catégorie.
- **Redirections nutrition/slow-web** : vérifier qu'elles résolvent bien vers `/life.html` sans boucle,
  et que `/sans-gluten.html` (chaînage historique) tombe aussi sur life.

## Vérification

- Build (`pnpm build` / Jekyll) sans erreur.
- 3 hubs : zone « À lire en premier » = les `featured` de la catégorie (absente si 0), ≤5 en
  « Derniers articles » (hors featured), lien « Voir tous → » ssi reste, vers `/posts.html#<slug>`.
- Le jeu `featured` initial (§3bis) = exactement les articles auparavant liés en dur ; rien perdu.
- `life.html` : sections nutrition + slow web présentes (texte repris) ; article multi bien listé.
- `nutrition.html`, `slow-web.html`, `sans-gluten.html` → **301 vers `/life.html`**, aucun 404.
- `posts.html` : 3 filtres OK ; deep-link `#outdoor`/`#life`/`#work` applique le bon filtre ;
  l'article multi apparaît sous Outdoor **et** Life ; **sans JS, tout visible**.
- Plus aucune catégorie `Sport`, `Nutrition`, `Slow web`, `Sans gluten`, `Perso`, `Tech & IA` dans
  `_posts` (seulement `Outdoor`, `Life`, `Work`).
- Header == footer (3 hubs). Aucun lien mort (index.md, work.md repointés).

## Résultat maintenance

Avant : 5 pages-hub, listes de liens à la main, header/footer désync. Après : **3 hubs identiques**,
**éditer le seul front-matter de l'article** (`categories`, `featured`) → « À lire en premier »,
« Derniers articles », `life.html` et `posts.html` se mettent à jour seuls. Zéro liste d'articles en
dur (hormis le lien conférence dans `work.md`), footer à source unique, une surface de moins à tenir
(Nutrition/Slow web fondus dans Life).
