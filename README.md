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
| `_stat-bar.scss` | `.c-stat-bar` | Barre de statistiques horizontale (score, série…) |
| `_callout.scss` | `.c-callout` | Encart informatif avec bordure latérale |
| `_stat-list.scss` | `.c-stat-list` | Liste de stats avec séparateurs |
| `_quiz.scss` | `.c-quiz` | Layout spécifique au quiz — surcouche contextuelle uniquement |

### Utilitaires (`www/_sass/utils/`)

| Classe | Effet |
|---|---|
| `.u-visually-hidden` | Masqué visuellement, accessible aux lecteurs d'écran |
| `.u-text--center` | `text-align: center` |

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
