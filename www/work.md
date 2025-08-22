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
projects:
  - name: vtt.bzh
    year: 2013 - Aujourd'hui
    profile: true
    mission: Création d'une web-app (Side project)
    expertises:
      - Gestion de projet
      - NodeJS
      - Jekyll
      - VueJS
      - Bootstrap
      - HTML5
      - CSS3
      - SEO
      - Supabase
      - UX / UI
      - Analytics
    url: https://github.com/jn-prod/www-vtt-bzh
    images:
      - /assets/images/projets/ext-6.png
  - name: breizhtraining.bzh
    year: "2019"
    profile: false
    mission: Création du site internet (Freelance)
    expertises:
      - Gestion de projet
      - NextJS
      - API
      - HTML5
      - CSS3
      - Bootstrap
      - UX / UI
    url: https://github.com/jn-prod/www-breizhtraining-bzh
    images:
      - /assets/images/projets/breizhtraining_bzh.png
  - name: gael-lebellec.bzh
    year: "2017"
    profile: false
    mission: Création du site internet (Freelance)
    expertises:
      - Gestion de projet
      - NextJS
      - API
      - HTML5
      - CSS3
      - Bootstrap
      - UX / UI
      - Multilangue
    url: https://github.com/jn-prod/www-gaellebellec-bzh
    images:
      - /assets/images/projets/ext-4.png
---

<!-- set vtt_bzh variable -->

{% for project in page.projects %} {% if project.name == 'vtt.bzh' %} {% assign vtt_bzh = project %} {% endif %} {% endfor %}

<img class="u-image-center" src="{{ site.author.avatar }}" alt="{{ site.author.name }}" />

# Je conçois l'interface web pensée avec votre équipe design dans le soucie de l'expérience utilisateur.

Moi c'est <a href="{{ site.url }}/about.html" rel="me">Nicolas Jouanno</a>, Lead front-end @MGDIS. Je conçois un design-system et travail sur l'outillage pour des micro frontends.

Je suis attentif à l'accessibilité et à l'éco-conception.

Je joue avec la JAM Stack et je m'intéresse a WASM.

Créateur de <a href="{{ vtt_bzh.url }}" target="_blank">vtt.bzh</a>.

## Du MVP à l'automatisation.

Vous êtes une startup ou une PME ? Vous voulez créer votre MVP pour toucher vos premiers utilisateur. Vous avez peut-être déjà trouvé votre Product Market Fit ou avez besoin de scaler pour suivre votre growth ?

J'écris du HTML, CSS et JavaScript, et je prends soin de créer une expérience utilisateur agréable et accessible sur le web.

Mon expertise de la stack de programmation Javascript, de son ecosytème et de ses frameworks (ex: NodeJS, AngularJS, VueJS, ...) me permettent de réaliser les développements front-end et back-end de votre application web.

Ils me permettent de vous donner les clefs pour réussir le développement de votre projet SAAS.

<!-- technologies -->
<ul class="c-icons-list">
  {% for technologie in page.technologies limit:10 %} {% if
  technologie.profile == true %}

  <li class="c-icons-list__element">
    <i class="{{technologie.icon}} icon--x3 "></i>
  </li>

{% endif %} {% endfor %}

</ul>

## Je suis un developpeur front-end qui donne vie à vos idées. J'aime garder les choses simples et procurer une expérience propre et fonctionnelle à vos utilisateurs.

Je suis <a href="/">développeur front-end</a>, je co-conçois des <a href="/offres/site-applicatif.html">sites web applicatif et applications mobile</a> avec votre équipe produit. Je suis aussi l'homme derrière <a href="https://vtt.bzh">vtt.bzh</a>, une application web pour trouver une nouvelle randonnée chaque week-end en Bretagne.

Ma trajectoire professionnel s'inscrit dans le domaine sportif. Après une carrière de <a href="/results.html">cycliste professionnel</a>, je deviens Responsable Communication et Webmaster chez Twinner Sport. J'ai créé et dévelopé mon entreprise de vente d'article de sport outdoor cross-canal. Puis je suis devenu <a href="/creation-site-internet.html">Concepteur Développeur Web</a> pour un groupement, dans lequel j'ai notamment développé une application web d'inscription en ligne <a href="/portfolio/project/event-izir.html">event.izir.fr</a> et un portail intranet pour piloter la stratégie commerciale du groupe.

Maintenant, je suis développeur full-stack JS (NodeJS, MongoDB, AngularJS & VueJS) chez MGDIS. Une entreprise Bretonne qui aide les collectivités à gérer les aides publiques. Passioné par les interfaces réussitent, j'aime échanger sur cette thématique avec les autres membre de la guilde UX/UI de l'entreprise. Curieux, je continue de me former et de m'informer sur les nouvelles technologies, frameworks et relève le defis des <a href="{{ site.url }}/certifications.html">certifications</a>.

Je partage ma veille et parle de sport, mobilité, productivité, minimalsime et d'environnement sous le pseudo <a href="{{ site.author.linkedin }}">{{ site.author.handle }}</a> sur Linkedin.

J'aime pratiquer les best practices des plus grandes entreprises tech, comme Lean Startup, le Design Thinking, la méthode Agile & le Lean UX.

J'interviens sur tout le cycle de vie d'un produit numérique : de la création de POC (Proof Of Concept) à <a href="/expertises/developpeur-back-end.html">l'automatisation de taches</a> pour des besoins de Growth Marketing, en passant par l'incrémentation de nouvelles features à un produit ou MVP (Minimum Viable Product).

Je développe avec vous une web app scalable qui tient compte de vos objectifs de rétention, des contraintes métier et de vos utilisateurs.

Commençons par <a href="{{ site.author.linkedin }}">en parler</a> ensemble. Enfin, je partage mes connaissances techniques, stratégiques et opérationnelles sur <a href="{{ site.url }}/stories.html">le blog</a>.

## Vous accompagner à chaque étape de votre application web.

Vous développez une <a href="/offres/site-applicatif.html">application mobile</a> ou un <a href="/offres/site-vitrine.html">site internet</a> pour votre startup ? Vous avez besoin d'un professionnel pour développer votre produit ? Vous souhaitez créer votre MVP pour séduire de nouveaux utilisateurs et/ou investisseurs ? Découvrez comment je peux vous aider dans vos projets:

## Mes projets

{% for project in page.projects %}

  <article id="{{ project.name }}" class="u-grid">
    <div class="u-grid__col-6">
      <h3>
        <a href="{{ project.url }}" target="_blank">{{ project.name }}</a>
      </h3>
      <img
        src="{{ project.images[0] }}"
        alt="{{ project.name }}"
      />
    </div>
    <div class="u-grid__col-6">
      <p>{{ project.mission }}, {{ project.year }}</p>
      <ul>
        {% for expertise in project.expertises %}
          <li>{{ expertise }}</li>
        {% endfor %}
      </ul>
    </div>
  </article>
{% endfor %}

## Me contacter.

Vous pouvez me contacter sur <a href="{{ site.author.linkedin }}">Linkedin</a>.
