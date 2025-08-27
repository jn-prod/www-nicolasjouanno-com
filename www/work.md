---
redirect_from:
  - /edito.html
  - /studio.html
  - /devis.html
  - /portfolio.html
layout: page
title: Découvrir mon parcours et mes projets
description: Développeur frontend et créateur d'interfaces qui plaisent a vos utilisateurs.
technologies:
  - name: Javascript
    url:
    icon: icon icon--js
    description: Language de script
    profile: true
  - name: Typescript
    url:
    icon: icon icon--ts
    description: Langage de programmation
    profile: true
  - name: Rust
    url:
    icon: icon icon--rust
    description: Langage de programmation
    profile: true
  - name: VueJS
    url:
    icon: icon icon--vuejs
    description: Librairie Javascript
    profile: true
  - name: ReactJS
    url:
    icon: icon icon--react
    description: Librairie Javascript
    profile: true
  - name: NODE JS
    url:
    icon: icon icon--node
    description: Framework Javascript
    profile: false
  - name: HTML 5
    url:
    icon: icon icon--html5
    description: HyperText Markup Language
    profile: true
  - name: CSS 3
    url:
    icon: icon icon--css3
    description: Feuilles de style
    profile: true
  - name: SASS
    url:
    icon: icon icon--sass
    description: Feuilles de style
    profile: true
  - name: GIT & GITHUB
    url:
    icon: icon icon--github
    description: Gestion de projet / versionning
    profile: false
  - name: AWS
    url:
    icon: icon icon--aws
    description: Hébergement
    profile: true
  - name: JIRA
    url:
    icon: icon icon--jira
    description: Gestion de projet
    profile: false
  - name: FIGMA
    url:
    icon: icon icon--figma
    description: Design / Wireframe
    profile: false
---

<!-- technologies -->
<ul class="c-icons-list">
  {% for technologie in page.technologies limit:10 %} {% if
  technologie.profile == true %}

  <li class="c-icons-list__element">
    <i class="{{technologie.icon}} icon--x3 "></i>
  </li>

{% endif %} {% endfor %}

</ul>

# Nicolas Jouanno — Développeur Frontend & Sportif Outdoor

Je suis développeur frontend spécialisé dans les design systems, l’accessibilité et les architectures modernes (Web Composants, micro-frontends, Jamstack).

Lead Frontend @MGDIS, je crée des interfaces accessibles et performantes, avec une attention particulière à l’éco-conception et à l’expérience utilisateur.

Créateur de [VTT.bzh](https://vtt.bzh/), un projet personnel autour du VTT en Bretagne, je développe aussi mon site personnel [nicolasjouanno.com](https://nicolasjouanno.com/) comme terrain d’expérimentation UX et minimalisme digital.

## En bref

- 📍 Pontivy, Bretagne
- 🌱 Minimalisme & frugalité numérique
- 🚴 Discipline & endurance issues du sport de haut niveau

## Expérience professionnelle

### Développeur Frontend — MGDIS (2019 – aujourd’hui)

Membre de la core team, responsable de l’outillage pour l’industrialisation du développement d’applications web basées sur des micro-services.

Missions principales :

- Conception, maintenance et déploiement de librairies, dont un design system de Web Components (StencilJS, SCSS) et son outillage.
- Résolution des problématiques frontend en cohérence avec la vision de l’architecte.
- Garant de l’accessibilité, homogénéité et qualité des livrables.
- Accompagnement et sensibilisation des développeurs.
- Validation technique des choix ergonomiques et graphiques.

Stack : JavaScript, TypeScript, AngularJS, Vue, StencilJS, Jest, Puppeteer, Playwright, CSS3/SCSS, NodeJS, GitLab, Docker…

### Concepteur Développeur Web — REF SPORT PONTIVY (2016–2019)

Pilotage et développement de projets digitaux :

- Applications web SAAS (Node.js, MongoDB, jQuery).
- Sites e-commerce (Prestashop, Shopify).
- Intranet & outils métiers.
- SEO, Analytics, blogs WordPress.

Missions : 
- gestion de projet digital,
- analyse des besoins,
- prototypage, 
- développement full-stack, 
- automatisation, 
- support utilisateur.

### Entrepreneur - [cyclesportnature.fr](http://cyclesportnature.fr/)  (2013–2016)

Commerce spécialisé indépendant (vente/réparation de vélos).

- Création et pilotage d’un business model combinant boutique physique et e-commerce.
- Stratégie digitale : acquisition (SEA, SEO, comparateurs), partenariats, newsletters.
- Management d’équipe (vente, SAV, CRM).
- Développement plateforme e-commerce & automatisations.

### Responsable Communication & Digital – Twinner Sport (2011 – 2013)

- Élaboration et mise en œuvre de la stratégie de communication en lien avec la direction.
- Gestion du budget marketing et coordination du plan média multicanal (print, web, événementiel).
- Pilotage et animation du site e-commerce (gestion du catalogue, mises à jour de contenus, suivi SEO).
- Animation digitale : newsletters, campagnes en ligne, réseaux sociaux.
- Maintenance et évolution du site WordPress (mises à jour, intégration de contenus).
- Management : recrutement, formation et accompagnement de l’équipe.
- Suivi et analyse des performances marketing et digitales.

### Webmaster — Twinner Sport (2009–2011)

- Création, administration et maintenance technique du site WordPress (mise en place initiale, mises à jour de la plateforme et des plugins).
- Intégration et mise à jour régulière des contenus (textes, visuels, fiches produits, actualités).
- Développement et intégration de nouvelles fonctionnalités (CSS/HTML, modules WordPress).
- Création de visuels et habillages graphiques pour le site.
- Optimisation SEO de base (métadonnées, structuration des contenus, référencement naturel).

### Cycliste professionnel — Bretagne Schuller (2008–2010)

[Découvrez mon palmarès sportif](/results.html)

### Vendeur — Twinner Sport (2007–2008)

## Projets personnels

- [VTT.bzh](https://vtt.bzh/) : calendrier communautaire VTT en Bretagne.
- [nicolasjouanno.com](https://nicolasjouanno.com/) : expérimentation UX & minimalisme digital.

## Compétences

- Frontend : JavaScript (ESNext), TypeScript, StencilJs, Vue.js, Web Components, SASS, HTML5, CSS3.
- Architecture : micro-frontends, Jamstack, monorepo, PNPM.
- Qualité & accessibilité : a11y, performance web, Green IT.
- Outils & DevOps : GitHub Actions, ViteJS, Jekyll, Cloudflare.

## Conférences & publications

- Paris-Web 2025 — Accessibilité et Web Components (intervenant).
- Participation régulière : Paris-Web 2023 & 2024 (auditeur).

## Formations

- Auditer l’accessibilité numérique — Empreinte Digitale (2024).
- Figma UI / prototypage — M2i Formation (2023).
- Design System — Usabilis (2022).
- TypeScript — Zenika (2022).
- Accessibilité multimédia — Access42 (2021).
- VueJS — Zenika (2020).
- Conception sites accessibles — Atalan (2020).
- BTS Management des Unités Commerciales (2008).
- Baccalauréat STT (2006).

## Valeurs et approche

- Discipline & endurance issues du sport de haut niveau.
- Minimalisme & frugalité numérique.
- Goût pour l’innovation et l’expérimentation.
