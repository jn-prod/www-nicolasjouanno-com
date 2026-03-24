# AGENTS.md

Lire le [README](./README.md) en premier — il décrit la stack, la structure, les commandes et le design system.

Ce fichier complète le README avec des règles spécifiques pour les agents travaillant sur ce projet.

## Vérification obligatoire

Après toute modification de SCSS, HTML ou JS :

```bash
cd www && pnpm build
```

Le build doit se terminer sans erreur avant de considérer une tâche comme terminée.

## Conventions SCSS

### Créer un composant

1. Créer `www/_sass/components/_mon-composant.scss` avec la classe `.c-mon-composant`
2. Ajouter `@use 'mon-composant';` dans `www/_sass/components/_index.scss`
3. Ne jamais styler un composant dans le fichier d'un autre composant

Les overrides contextuels (ex: marges spécifiques à un contexte) se font dans le fichier du composant parent, pas dans le composant enfant.

### Ne pas faire

- Pas de `display: grid` — uniquement flexbox
- Pas de styles inline ou de `style=` dans le HTML
- Pas de `width: 100%` sur les éléments block naturels (`div`, `section`, `article`, `legend`, `progress[display:block]`…) — ils sont naturellement pleine largeur
- Pas de variables CSS spécifiques à un composant (ex: `--quiz-color-*`) — utiliser uniquement les tokens globaux du design system
- Pas d'utilitaire pour quelque chose qui peut être une variante de composant

### Boutons

`.c-button` est `inline-flex` avec `width: fit-content`. Pour les boutons pleine largeur, utiliser `.c-button--fullwidth` (pas un utilitaire). Ne jamais surcharger les styles du bouton en dehors de `_button.scss` sauf pour des contraintes de layout (ex: `flex: 1` dans un flex container).

## Conventions HTML / Liquid

- Utiliser `hidden` pour masquer/révéler des éléments — pas `display: none` via class
- Le contenu statique connu à l'avance (messages, labels) doit être pré-rendu en HTML et togglé via `hidden`, pas injecté par JS via `textContent`
- Les données du quiz sont dans `www/_data/gluten_quiz.yml` — format : `text`, `emoji`, `hasGluten` (bool), `difficulty` (low/medium/hard), `explanation`
- Les cartes question sont pré-rendues via `www/_includes/apps/gluten-quiz-card.html` itéré par Liquid

## Conventions JavaScript

Style fonctionnel : séparer la logique métier (fonctions pures) des effets de bord (DOM).

### Structure attendue

```js
// Fonctions pures — pas d'accès au DOM, pas de mutation
function computeSomething(state, input) {
  return { ...state, /* nouvelles valeurs */ };
}

// Effets de bord — orchestrent calcul puis rendu
function onSomeEvent(input) {
  state = computeSomething(state, input);
  // mises à jour DOM ici
}
```

### Règles

- L'état mutable est un seul objet `state` — remplacé par spread, jamais muté sur place
- Les fonctions qui transforment l'état reçoivent l'état en argument et retournent un nouvel état
- Pas de variables globales multiples mutées indépendamment
- Les fonctions de rendu lisent depuis `state` — ne pas leur passer des valeurs en argument sauf nécessité
- `forEach`, `querySelectorAll` + callbacks fléchés pour les opérations sur listes DOM
- Template literals pour les concaténations de chaînes

## Accessibilité

- Les radios cachés visuellement utilisent `.u-visually-hidden` (pas `display: none` ni `visibility: hidden`)
- Les éléments interactifs désactivés utilisent l'attribut `disabled` (pas une class)
- Les régions dynamiques utilisent `aria-live` ou `role="status"`/`role="alert"` selon le niveau d'urgence

## Ajouter une app

1. Créer `www/apps/{nom}/index.html` avec front matter Jekyll (`layout: page`, `permalink`, etc.)
2. Créer `www/assets/apps/{nom}/index.js` si JS nécessaire
3. Si des cards/fragments sont réutilisables : `www/_includes/apps/{nom}-card.html`
4. Si données YAML : `www/_data/{nom}.yml`
5. Si styles spécifiques : `www/_sass/components/_{nom}.scss` + import dans `_index.scss`
