# www.nicolasjouanno.com

Site personnel de Nicolas Jouanno — portfolio, blog, et mini-apps interactives. Site statique généré avec Jekyll, déployé sur GitHub Pages.

## Stack

| Couche | Technologie |
|---|---|
| Générateur | Jekyll 4 (Ruby) + Liquid |
| Styles | SCSS — design system BEM |
| Linting | ESLint, Stylelint, Prettier |
| Images | sharp (WebP), svgo |
| Package manager | pnpm workspaces |
| Déploiement | GitHub Actions → GitHub Pages |

## Structure du monorepo

```
/
├── packages/
│   └── images/          # Pipeline d'optimisation images (JPG/PNG → WebP, SVG → svgo)
└── www/                 # Site Jekyll
    ├── _config.yml
    ├── _data/           # Données YAML (ex: gluten_quiz.yml)
    ├── _includes/       # Fragments Liquid réutilisables
    ├── _layouts/        # Layouts de page
    ├── _posts/          # Articles
    ├── _sass/           # Design system SCSS
    │   ├── base/        # Typographie, variables, reset
    │   ├── components/  # Composants UI (BEM)
    │   ├── layout/
    │   ├── plugins/
    │   └── utils/       # Classes utilitaires
    ├── apps/            # Mini-apps (HTML + JS vanilla)
    └── assets/          # JS, images statiques
```

## Commandes

Toutes les commandes se lancent depuis `www/` sauf indication contraire.

```bash
# Build complet
pnpm build           # Jekyll + copie images optimisées

# Développement
pnpm dev             # Sert _site/ avec python http.server (port 8000)

# Lint
pnpm lint            # ESLint + Stylelint + Prettier (check)
pnpm lint:fix        # Correction automatique

# Depuis la racine
pnpm build           # Build packages + www
pnpm lint            # Lint l'ensemble du monorepo
```

## Design system

### Composants (`www/_sass/components/`)

Nomenclature BEM : `.c-{composant}__element--modifier`

| Fichier | Classe | Description |
|---|---|---|
| `_button.scss` | `.c-button` | Bouton de base — `inline-flex`, `width: fit-content` |
| `_button.scss` | `.c-button--{variant}` | Variantes de couleur : `primary`, `secondary`, `dark`, `light` |
| `_button.scss` | `.c-button--{variant}-outline` | Variantes contour |
| `_button.scss` | `.c-button--fullwidth` | Pleine largeur — passe en `display: flex` |
| `_button.scss` | `.c-button[disabled]` | État désactivé — `opacity: 0.8`, `cursor: not-allowed` |
| `_progress.scss` | `.c-progress` | Barre de progression native stylisée (`display: block`) |
| `_stat.scss` | `.c-stat` + `.c-stat--{bar\|list}` | Statistiques — **layout seul** (skin via `.c-card`) ; `--bar` (KPI horizontaux), `--list` (lignes label/valeur). Éléments `__label`/`__value` communs |
| `_card.scss` | `.c-card` | **Skin réutilisable** : fond, bordure, border-radius, spacing. Toute surface à fond/bordure passe par là |
| `_card.scss` | `.c-card--{variant}` | Variantes de fond : `flat` (blanc), `neutral` (gris), `primary` (couleur primaire, texte clair) |
| `_card.scss` | `.c-card--outline` | Modificateur : bordure `dark` |
| `_card.scss` | `.c-card--{size}` | Taille : pilote **padding ET border-radius** (proportionnels) — `small` (8 / 4), `medium` (16 / 8), `large` (32 / 16) |
| `_callout.scss` | `.c-callout` | **Couche de contenu** (titre/texte centrés + CTA optionnel) posée sur une `.c-card` ; hérite de `--card-fg` |
| `_quote.scss` | `.c-quote` + `.c-quote--{size}` | Citation réutilisable, posée sur une `.c-card` ; la taille de typo est une variante propre (`small`/`medium`/`large`), indépendante de la taille de card |
| `_avatar.scss` | `.c-avatar` + `--{small\|large\|xlarge}` | Avatar rond (image) — tailles 32 / 128 / 256 |
| `_meta.scss` | `.c-meta` | Méta-information (date, handle, catégorie…) — texte petit et atténué |
| `_tag.scss` | `.c-tag` | Étiquette / tag (catégorie, mot-clé) |
| `_quiz.scss` | `.c-quiz` | Layout spécifique au quiz — surcouche contextuelle uniquement |

> **Règle — fonds colorés = `.c-card`.** Aucun composant ne porte son propre `background` / `border` / `border-radius` / `padding` : ce skin est centralisé dans `.c-card`. Un composant à fond coloré compose `c-card c-card--{variant} c-card--{size}` et ne garde que son layout/typo. Si le contenu est un encart centré (titre + texte + CTA), ajouter `.c-callout`.
>
> **Règle — newsletter / « Me suivre ».** L'include `{% include /plugins/newsletter.html %}` ne contient **que le formulaire**. C'est le **bloc parent** (la section titre + accroche + formulaire) qui est la card — pas l'include :
> ```html
> <aside class="c-card c-card--neutral c-card--large">
>   <h2>…</h2>
>   <p>…accroche…</p>
>   {% include /plugins/newsletter.html %}
> </aside>
> ```
> Le titre vit **dans** la card (jamais au-dessus). Variante `neutral` (gris doux).
>
> **Règle — radius proportionnel à la taille.** Le `border-radius` n'est jamais codé en dur sur un composant : il découle de `.c-card--{size}` via `--card-radius` (`small` 4, `medium` 8, `large` 16). Le radius `large` (16) = celui des images de contenu, pour un arrondi cohérent entre cards et médias.
>
> **Règle — nesting de cards : descente d'un seul cran.** Une card imbriquée doit être **exactement une taille en dessous** de sa card parente la plus proche : `large > medium > small`. On **ne saute pas de palier** → `large` contenant directement une `small` est **interdit** (il faut passer par une `medium`). `small` est le plancher (une `small` ne peut contenir qu'une autre `small`). Seuls enfants autorisés : `large→medium`, `medium→small`, `small→small`. _Vérifié automatiquement par le harnais : `site-eval.sh` grader **R12** (ast-grep, `tools/scripts/sg-rules/card-nesting.yml` côté corp-ai) — tout nesting non conforme refuse le push._
>
> **Règle — image de fond = `--card-bg-image`.** Une card peut porter une image de fond via la variable `--card-bg-image` (inline `style="--card-bg-image: url('…')"`). Si définie, l'image s'affiche **par-dessus** `--card-bg` (qui reste la couleur de fallback). Pour un bandeau image avec encart lisible, on **imbrique** : carte image (`primary large` + `--card-bg-image`) > carte contenu (`flat medium`). _Ce duo remplace l'ancien `.c-jumbotron` (supprimé)._
>
> _Exception volontaire (hors `.c-card`) : `.c-section--{variant}` (bandes pleine largeur, layout edge-to-edge)._

### Utilitaires (`www/_sass/utils/`)

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

> **Règle — spacing en tailles de t-shirt.** Une marge **ad-hoc** (dans le markup, au coup par coup) n'est **jamais codée en dur** (ni `var(--size-*)` brut, ni valeur arbitraire) : on compose une **variante explicite** `small` / `medium` / `large` (= `8` / `16` / `32`), alignée sur la convention t-shirt de `.c-card` / `.c-quote`. Les marges sont **logiques** (`block-start` / `block-end` / `inline`) pour rester correctes en RTL. Échelle définie par une seule source dans `_sass/utils/_spacing.scss` (`$spacing-sizes`). À privilégier quand l'espacement ne peut pas venir du `gap` d'un conteneur flex parent (ex. card CTA isolée après une `.c-section__post-list` à marge nulle).
>
> **Portée.** Ces utilitaires visent le spacing **contextuel / ad-hoc**. Le **rythme externe d'un composant réutilisable** (ex. `.c-callout { margin-block: var(--size-32) }`) peut **rester dans son SCSS** s'il mappe sur l'échelle (8/16/32) : une marge possédée par le composant s'applique automatiquement partout (anti-oubli), là où la sortir en utilitaire la rendrait oubliable sur chaque instance. Les **marges internes** entre sous-éléments d'un composant restent **toujours** dans son SCSS (encapsulation).

> Les éléments block (`div`, `section`, `legend`, `progress` avec `display: block`…) n'ont pas besoin de `width: 100%` — c'est leur comportement naturel. Ne pas créer d'utilitaire pour ça.

### Tokens CSS

Définis dans `www/_sass/_variables.scss` :

```
--color-primary / --color-primary-with
--color-dark / --color-dark-with
--color-secondary / --color-light
--size-4, --size-8, --size-16, --size-32
--font-size, --font-size-h3, --font-size-h4
--font-family, --font-family-heading
--border, --line-height
```

## Apps

### Gluten ou Pas Gluten (`/apps/gluten-not-gluten/`)

Quiz interactif sur les aliments contenant du gluten.

- **Données** : `www/_data/gluten_quiz.yml` — format : `text`, `emoji`, `hasGluten`, `difficulty` (`low`/`medium`/`hard`), `explanation`
- **Template** : `www/_includes/apps/gluten-quiz-card.html` — carte pré-rendue par Liquid
- **JS** : `www/assets/apps/gluten-not-gluten/index.js` — style fonctionnel : fonctions pures + effets DOM séparés, état unique immuable

## Images

Le pipeline `packages/images` convertit les sources JPG/PNG en WebP et optimise les SVG. Les images optimisées sont copiées dans `www/_site/images/` au build.

```bash
# Depuis la racine
pnpm build:packages   # Rebuild uniquement les images
```

## Déploiement

Push sur `main` → GitHub Actions (`.github/workflows/github-pages.yml`) → build → deploy `www/_site/` sur GitHub Pages → `www.nicolasjouanno.com`

## License

- **Code** (HTML, CSS, JS, config Jekyll) : [MIT](./LICENSE-CODE.md)
- **Contenu** (articles, textes, images) : © Nicolas Jouanno — Tous droits réservés ([LICENSE-CONTENT](./LICENSE-CONTENT.md))
