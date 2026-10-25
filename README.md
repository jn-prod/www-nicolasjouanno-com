# www.nicolasjouanno.com

Site personnel de Nicolas Jouanno : le fil durable de ses publications et des outils nés de besoins vécus. Site statique généré avec Jekyll, déployé sur GitHub Pages.

## Stack

| Couche | Technologie |
|---|---|
| Générateur | Jekyll 4 (Ruby) + Liquid |
| Styles | SCSS — design system BEM |
| Linting | ESLint, Stylelint, Prettier |
| Images | sharp (WebP), svgo |
| Package manager | pnpm |
| Déploiement | GitHub Actions → GitHub Pages |

## Structure

```
/
├── _config.yml
├── _data/           # Données YAML (ex: gluten_quiz.yml)
├── _includes/       # Fragments Liquid réutilisables
├── _layouts/        # Layouts de page
├── _posts/          # Articles publiés
├── _drafts/         # Brouillons Jekyll versionnés, non publiés par défaut
├── _sass/           # Design system SCSS
│   ├── base/        # Typographie, variables, reset
│   ├── components/  # Composants UI (BEM)
│   ├── layout/
│   ├── plugins/
│   └── utils/       # Classes utilitaires
├── _templates/      # Modèles Markdown pour Obsidian
├── apps/            # Mini-apps (HTML + JS vanilla)
├── assets/          # JS et styles servis directement
├── images/          # Sources JPG/PNG/SVG éditables
└── scripts/         # Contrôles et opérations de build
```

### Hiérarchie des layouts

- `_layouts/base.html` porte le document HTML, les métadonnées, les assets communs et la mesure d’audience.
- `_layouts/default.html` hérite de `base` et ajoute sans condition le header avec la bio, la navigation, le contenu principal et le footer standard.
- `_layouts/landing.html` hérite directement de `base` et centralise le contenu principal et le footer compact des pages d’inscription ou autres landings minimales.
- `page`, `post`, `tag` et `category` héritent du layout `default`.

## Commandes

Toutes les commandes se lancent depuis la racine du dépôt.

```bash
# Build complet
pnpm build           # Jekyll + copie images optimisées

# Développement
pnpm dev             # Sert _site/ avec python http.server (port 8000)

# Lint
pnpm lint            # ESLint + Stylelint + Prettier (check)
pnpm lint:fix        # Correction automatique

# Images uniquement
pnpm build:images    # WebP + optimisation SVG dans images-dist/
```

## Publier un article

Le front matter reste volontairement natif Jekyll : une seule `category` décrit le format de lecture, plusieurs `tags` décrivent les sujets.

```yaml
---
title: "Titre"
description: "Description"
category: guide # guide, recit, newsletter ou archive
tags:
  - outdoor
  - vtt
  - nutrition
image: /images/posts/nom-du-fichier.jpg
image_alt: "Description fidèle de la photo"
image_caption: "[Lieu](URL), date. Contexte de la photo. Appareil © Auteur."
---
```

- `category` alimente les pages Guides, Récits, Newsletter et Archive ainsi que le fil d’Ariane.
- `tags` alimente les pages thématiques Outdoor, VTT, Trail, Nutrition, Sans gluten et Work. Les publications VTT et trail portent aussi le tag parent `outdoor`.
- `pin: true`, facultatif, remonte la publication en tête des listes concernées et l’identifie par le libellé « Épinglé » dans sa carte. Un seul post peut porter cette propriété dans tout le dépôt : activer un nouveau pin impose de retirer le précédent. Le pin doit déclarer une photo éditoriale personnelle, `image_alt` et `description`. Une publication non épinglée ne déclare pas `pin`. Ces règles sont vérifiées au build.
- Une newsletter porte un titre éditorial autonome : ni numéro, ni saison, ni mois seul, ni préfixe « La Sortie ». La date et l’appartenance à la publication sont déjà portées par le front matter, l’URL et la taxonomie. Sa description apporte un contexte ou un fait précis sans répéter le titre.
- Les domaines publics sont `outdoor`, `vtt`, `trail`, `nutrition`, `sans-gluten`, `work` et `la-sortie`. Des repères secondaires contrôlés, d’un seul mot (`enduro`, `équipement`, `randonnée`, `entraînement`, `hiver`, `santé`, `sécurité`, `cyclisme`, `compétition`, `web`, `ia`, `productivité`), peuvent relier les articles entre eux, sans page dédiée. Ne pas créer de tag SEO, marque, lieu ou requête longue.
- Les pages qui portent un champ `tag` définissent les sujets publics ; `parent_tag` relie une page à son sujet parent dans le fil d’Ariane. Les tags secondaires restent limités au vocabulaire contrôlé ci-dessus.
- Dans le front matter comme dans le contenu, référencer une photo avec son extension source (`.jpg`, `.jpeg` ou `.png`) ; le pré-build publie sa version WebP.
- `image_alt` décrit ce qui est visible ; `image_caption`, facultatif et interprété en Markdown, contextualise la couverture et porte son crédit sous la forme `Appareil © Auteur`, sans tiret ni pictogramme.

## Design system

### Stabilisation de la home

La structure `profil → inscription → canaux → pin → flux → archives` est le contrat courant de la home. Ne pas ajouter de titre visible ou de section intermédiaire qui duplique l’un de ces rôles. Une évolution structurelle doit désormais répondre à un défaut constaté, à un nouveau besoin éditorial ou à un signal mesuré ; une préférence isolée ne justifie pas une nouvelle refonte.

La home utilise le layout `landing` : son profil, ses actions et son flux remplacent la navigation globale. Les pages intérieures conservent le layout `default`. Le bouton « Partager » relève de l’amélioration progressive et n’est affiché que lorsque le navigateur expose l’API native de partage.

### Composants (`_sass/components/`)

Nomenclature BEM : `.c-{composant}__element--modifier`

| Fichier | Classe | Description |
|---|---|---|
| `_button.scss` | `.c-button` | Bouton de base — `inline-flex`, `width: fit-content` |
| `_button.scss` | `.c-button--{variant}` | Variantes de couleur : `brand`, `dark`, `light` |
| `_button.scss` | `.c-button--{variant}-outline` | Variantes contour |
| `_button.scss` | `.c-button--icon` | Icône de marque seule, accompagnée d'un `aria-label` explicite |
| `_button.scss` | `.c-button--fullwidth` | Pleine largeur — passe en `display: flex` |
| `_button.scss` | `.c-button[disabled]` | État désactivé — `opacity: 0.8`, `cursor: not-allowed` |
| `_button-stack.scss` | `.c-button-stack` + `--vertical` / `--center` / `--fill` | Groupe d'actions avec un gap horizontal et vertical de 4 px, y compris au retour à la ligne |
| `_control.scss` | `.c-control` | Champ texte, select ou textarea : hauteur minimale, padding, bordure, rayon, typo et état désactivé communs |
| `_progress.scss` | `.c-progress` | Barre de progression native stylisée (`display: block`) |
| `_tabs.scss` | `.c-tabs` + `__nav` / `__tab` | Primitive d’onglets : cible de 44 px, onglet courant marqué par `aria-current="page"` et souligné par la marque, survol en neutre foncé |
| `_stat.scss` | `.c-stat` + `.c-stat--{bar\|list}` | Statistiques — **layout seul** (skin via `.c-card`) ; `--bar` (KPI horizontaux), `--list` (lignes label/valeur). Éléments `__label`/`__value` communs |
| `_card.scss` | `.c-card` | **Skin réutilisable** : fond, bordure, border-radius, spacing. Toute surface à fond/bordure passe par là |
| `_card.scss` | `.c-card--{variant}` | Variantes de fond et texte : `flat`, `neutral`, `brand`, `info`, `alert` ; les deux dernières utilisent les aliases sémantiques partagés |
| `_card.scss` | `.c-card--outline` | Modificateur : bordure `dark` |
| `_card.scss` | `.c-card--{size}` | Taille : pilote **padding ET border-radius** (proportionnels) — `small` (8 / 4), `medium` (16 / 8), `large` (32 / 16) |
| `_callout.scss` | `.c-callout` | **Couche de contenu** (titre/texte centrés + CTA optionnel) posée sur une `.c-card` ; hérite de `--card-fg` |
| `_quote.scss` | `.c-quote` + `.c-quote--{size}` | Citation réutilisable, posée sur une `.c-card` ; la taille de typo est une variante propre (`small`/`medium`/`large`), indépendante de la taille de card |
| `_avatar.scss` | `.c-avatar` + `--{small\|medium\|large\|xlarge}` | Avatar rond (image) — tailles 32 / 96 / 128 / 256 |
| `_icon.scss` | `.c-icon` + `--{x2\|x3}` | Icône décorative rendue par `components/icon.html` : carré de `1em` (`--icon-size`) qui suit la taille du texte ; `scale="2"` ou `"3"` pour les multiples |
| `_meta.scss` | `.c-meta` | Méta-information (date, handle, catégorie…) — texte petit et atténué |
| `_meta-list.scss` | `.c-meta-list` | Liste flexible de métadonnées, avec icône ou lien facultatif |
| `_tag.scss` | `.c-tag` | Étiquette / tag (catégorie, mot-clé) |
| `_breadcrumb.scss` | `.c-breadcrumb` | Fil d’Ariane sémantique et séparateurs visuels |
| `_author.scss` | `.c-author` | Identité compacte d’un auteur, composée avec `.c-avatar` et `.c-meta` |
| `_post-list.scss` | `.c-post-list` | Liste verticale des cartes de publication |
| `_publication-card.scss` | `.c-publication-card` | Anatomie d’un aperçu éditorial : pin, taxonomie, titre, date, image et résumé |
| `_embed.scss` | `.c-embed` | Média embarqué responsive au ratio 16/9, sans style inline |
| `_section.scss` | `.c-section` | Bande pleine largeur et variantes `brand`, `dark`, `light` |
| `_navigation.scss` | `.c-navigation` | Navigation d’en-tête et groupe d’actions |
| `_quiz.scss` | `.c-quiz` | Layout spécifique au quiz — surcouche contextuelle uniquement |
| `_newsletter-form.scss` | `.c-newsletter-form` | Formulaire d’inscription natif au site, relié à Kit sans charger son script embarqué |
| `_profile.scss` | `.c-profile` | En-tête de profil de la home : identité, description, métadonnées et actions |
| `_channel-navigation.scss` | `.c-channel-navigation` | Navigation compacte entre le site, ses outils et les réseaux publics sélectionnés ; compose `.c-tabs` et ne porte que le layout |

> **Règle — un seul langage par bouton.** Un bouton répond soit à « qui ? », soit à « quoi ? », jamais aux deux. Une marque ou un réseau identifiable (« qui ? ») utilise de préférence son icône seule via `.c-button--icon`, avec un `aria-label` explicite. Une action (« quoi ? ») utilise uniquement un libellé textuel, sans élément enfant, icône, emoji, flèche ou pictogramme. Le caractère `→` et les autres glyphes directionnels sont interdits dans les boutons d'action : le verbe du libellé doit suffire à exprimer l'action. Ne jamais associer une icône et du texte dans un même bouton.
>
> **Règle — contrôles et états communs.** Les champs visibles composent `.c-control`. Boutons et contrôles partagent une hauteur minimale de 44 px, un corps de 15 px, un focus visible de marque en 2 px et une opacité désactivée de `0.8`. Aucun composant métier ne redéfinit localement ces états.
>
> **Règle — emoji décoratif inaccessible.** Un emoji purement visuel est toujours enveloppé dans un élément portant `aria-hidden="true"`. Le texte adjacent doit conserver seul tout le sens ; un emoji ne remplace jamais un libellé accessible.
>
> **Règle — fonds colorés = `.c-card`.** Aucun composant ne porte son propre `background` / `border` / `border-radius` / `padding` : ce skin est centralisé dans `.c-card`. Un composant à fond coloré compose `c-card c-card--{variant} c-card--{size}` et ne garde que son layout/typo. Si le contenu est un encart centré (titre + texte + CTA), ajouter `.c-callout`.
>
> **Règle — radius proportionnel à la taille.** Le `border-radius` n'est jamais codé en dur sur un composant : il découle de `.c-card--{size}` via `--card-radius` (`small` 4, `medium` 8, `large` 16). Le radius `large` (16) = celui des images de contenu, pour un arrondi cohérent entre cards et médias.
>
> **Règle — nesting de cards : descente d'un seul cran.** Une card imbriquée doit être **exactement une taille en dessous** de sa card parente la plus proche : `large > medium > small`. On **ne saute pas de palier** → `large` contenant directement une `small` est **interdit** (il faut passer par une `medium`). `small` est le plancher (une `small` ne peut contenir qu'une autre `small`). Seuls enfants autorisés : `large→medium`, `medium→small`, `small→small`. _Vérifié automatiquement par le harnais : `site-eval.sh` grader **R12** (ast-grep, `tools/scripts/sg-rules/card-nesting.yml` côté corp-ai) — tout nesting non conforme refuse le push._
>
> **Règle — image de fond = `--card-bg-image`.** Une card peut porter une image de fond via la variable `--card-bg-image` (inline `style="--card-bg-image: url('…')"`). Si définie, l'image s'affiche **par-dessus** `--card-bg` (qui reste la couleur de fallback). Pour un bandeau image avec encart lisible, on **imbrique** : carte image (`brand large` + `--card-bg-image`) > carte contenu (`flat medium`). _Ce duo remplace l'ancien `.c-jumbotron` (supprimé)._
>
> _Exception volontaire (hors `.c-card`) : `.c-section--{variant}` (bandes pleine largeur, layout edge-to-edge)._

### Utilitaires (`_sass/utils/`)

| Classe | Effet |
|---|---|
| `.u-visually-hidden` | Masqué visuellement, accessible aux lecteurs d'écran |
| `.u-text--center` | `text-align: center` |
| `.u-title` | Typo de titre (police d'affichage `--font-family-heading`) — pour styler en titre un élément non-`h*` (légende, valeur…) |
| `.u-container` | Conteneur centré à la largeur du contenu (`max-inline-size: breakpoint-m; margin-inline: auto`) — même calage que `.c-layout__content` |
| `.u-img` + `--cover` / `--rounded` | Image responsive ; `--cover` recadre, `--rounded` hérite du radius de la `.c-card` englobante (`--card-radius`) |
| `.u-link--dark` | Lien dark sans soulignement, souligné au survol/focus |
| `.u-flex` (+ modifs) | Conteneur flex **pur** (composable avec `.c-card`). Direction `--col` ; justify `--center`/`--between`/`--around`/`--end` ; align `--start`/`--stretch` ; `--nowrap` ; `--tight` (gap 8) ; `--fill` (enfants largeur égale). Défaut : rangée, wrap, items centrés, gap 16 |
| `.u-spacing--0` | Reset d'espacement : `margin: 0; padding: 0` (ex. `<ul>` flex, `<figure>`) |
| `.u-spacing--block-start-{small\|medium\|large}` | Marge logique en haut — `8` / `16` / `32` |
| `.u-spacing--block-end-{small\|medium\|large}` | Marge logique en bas — `8` / `16` / `32` |
| `.u-spacing--inline-{small\|medium\|large}` | Marge logique horizontale (gauche + droite) — `8` / `16` / `32` |

> **Règle — spacing en tailles de t-shirt.** Une marge **ad-hoc** (dans le markup, au coup par coup) n'est **jamais codée en dur** (ni `var(--size-*)` brut, ni valeur arbitraire) : on compose une **variante explicite** `small` / `medium` / `large` (= `8` / `16` / `32`), alignée sur la convention t-shirt de `.c-card` / `.c-quote`. Les marges sont **logiques** (`block-start` / `block-end` / `inline`) pour rester correctes en RTL. Échelle définie par une seule source dans `_sass/utils/_spacing.scss` (`$spacing-sizes`). À privilégier quand l'espacement ne peut pas venir du `gap` d'un conteneur flex parent (ex. card CTA isolée après une `.c-post-list` à marge nulle).
>
> **Portée.** Ces utilitaires visent le spacing **contextuel / ad-hoc**. Le **rythme externe d'un composant réutilisable** (ex. `.c-callout { margin-block: var(--size-32) }`) peut **rester dans son SCSS** s'il mappe sur l'échelle (8/16/32) : une marge possédée par le composant s'applique automatiquement partout (anti-oubli), là où la sortir en utilitaire la rendrait oubliable sur chaque instance. Les **marges internes** entre sous-éléments d'un composant restent **toujours** dans son SCSS (encapsulation).

> Les éléments block (`div`, `section`, `legend`, `progress` avec `display: block`…) n'ont pas besoin de `width: 100%` — c'est leur comportement naturel. Ne pas créer d'utilitaire pour ça.

### Tokens CSS

Définis dans `_sass/_variables.scss` :

```
--b-color-neutral-0 à --b-color-neutral-100
--b-color-semantic-alert-0 à --b-color-semantic-alert-100
--b-color-semantic-info-0 à --b-color-semantic-info-100
--b-color-semantic-{alert|info}-{background-muted|background-emphasis|border|foreground}
--b-color-border / --border
--b-color-brand
--size-4, --size-8, --size-16, --size-32
--b-line-width-strong, --b-control-height, --b-control-radius
--b-control-font-size, --b-disabled-opacity
--font-size, --font-size-h3, --font-size-h4
--font-family, --font-family-heading
--border, --line-height
```

Les palettes `--b-color-neutral-*` et `--b-color-semantic-*`, leurs aliases d'usage et `--b-color-border`
appartiennent au Core partagé. Les composants utilisent les aliases sémantiques
(`background-muted`, `background-emphasis`, `border`, `foreground`) plutôt que les niveaux numériques. Seule
`--b-color-brand` reste une couleur propre à nj.com.

## Apps

### Gluten ou Pas Gluten (`/apps/gluten-not-gluten/`)

Quiz interactif sur les aliments contenant du gluten.

- **Données** : `_data/gluten_quiz.yml` — format : `text`, `emoji`, `answer` (`gluten`/`sans-gluten`/`ca-depend`), `difficulty` (`low`/`medium`/`hard`), `explanation`, `source` (clé de `_data/gluten_quiz_sources.yml`)
- **Template** : `_includes/apps/gluten-quiz-card.html` — carte pré-rendue par Liquid
- **JS** : `apps/gluten-not-gluten/index.js` — style fonctionnel : fonctions pures + effets DOM séparés, état unique immuable

## Images

Le pipeline intégré convertit les sources JPG/PNG de `images/` en WebP et optimise les SVG. Les images Open Graph de `images/og/` conservent leur format pour rester compatibles avec les réseaux sociaux. Les fichiers produits sont copiés dans `_site/images/` au build. Dans un article, une pièce jointe ajoutée dans `images/posts/` est référencée avec son extension source.

Pour une image **dans le corps d'un post ou d'un brouillon**, garder le lien vers le fichier source permet l'aperçu dans iA Writer et Obsidian :

```md
![Description fidèle de la photo](../images/posts/nom-du-fichier.jpg)
```

Au build, le pré-build remplace temporairement ce lien par `/images/posts/nom-du-fichier.webp` dans le HTML publié, puis restaure les sources Markdown. Jekyll reste en mode sûr, compatible avec GitHub Pages.

```bash
pnpm build:images
```

## Flux de publication

`/feed.xml` est le flux RSS principal. `/la-sortie/feed.xml` applique les mêmes règles aux seules publications qui portent le tag `la-sortie`. Les deux flux contiennent le texte intégral, transforment les liens et médias internes en URL absolues et conservent la mention « Initialement publié sur nicolasjouanno.com ».

Le formulaire partagé `_includes/components/newsletter-form.html` est affiché sur l’accueil, la page Outdoor, à la fin de chaque article et sur la page `/la-sortie/subscribe/`. Cette dernière est la destination minimale à partager hors du site ; elle ne montre que la promesse, le formulaire et un lien discret vers les éditions. L'ancienne URL `/subscribe/` redirige vers elle. Les pages génériques de cycle de vie restent sous `/newsletter/` (`merci`, `confirmee`, `good-by`) ; sa racine redirige vers l'archive de La Sortie. Le formulaire envoie directement les inscriptions au formulaire Kit `9378910` pour **La Sortie** : une édition mensuelle ouverte par une photo et un vécu, poursuivie par un sujet outdoor principal, d’éventuelles rubriques secondaires et une sélection issue du calendrier partagé de vtt.bzh. Le rendu reste maîtrisé par le site et aucun script d’intégration Kit n’est chargé.

Les éditions sont des posts Jekyll ordinaires avec `category: newsletter`, rendus depuis `_templates/newsletter.md` et archivés sous `/la-sortie/`. La matière calendrier VTT est préparée dans le dépôt vtt.bzh ; le post, l’archive et l’envoi restent relus manuellement.

## Déploiement

Push sur `main` → GitHub Actions (`.github/workflows/github-pages.yml`) → build → déploiement de `_site/` sur GitHub Pages → `www.nicolasjouanno.com`

## License

- **Code** (HTML, CSS, JS, config Jekyll) : [MIT](./LICENSE-CODE.md)
- **Contenu** (articles, textes, images) : © Nicolas Jouanno — Tous droits réservés ([LICENSE-CONTENT](./LICENSE-CONTENT.md))
