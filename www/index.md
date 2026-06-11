---
redirect_from:
  - /portfolio/project/volt.html
  - /toolbox.html
  - /coaching.html
  - /cours.html
  - /cours/creer-site-web-sans-coder.html
  - /stories
  - /academy.html
  - /advertise/terms.html
  - /advertise.html
  - /categories/sport.html
  - /sitemap.html
  - /contact.html
  - /newsletter.html
  - /about.html
  - /follow.html
title: "Nicolas Jouanno — Lead frontend : design system & agents IA"
layout: page
description: "Lead frontend chez MGDIS : je conçois un design system (Web Components, accessibilité RGAA) et je construis des systèmes agentiques. Speaker Paris-Web 2025."
permalink: /index.html
breadcrumb_hide: true
signature: true
---

<hgroup class="u-text--center">
  <h1><span class="u-visually-hidden">{{ site.title }} </span>Lead développeur frontend</h1>
  <p>Salut, moi c'est Nicolas. Le jour, je conçois des design systems ; le soir, je construis des systèmes agentiques. Deux échelles, une même discipline d'ingénierie.</p>
</hgroup>

<aside id="follow" class="c-card c-card--neutral c-card--large">
  <h2>📬 Un email quand je publie</h2>
  <p>Mes articles sur le design system et les systèmes agentiques, directement dans votre boîte. Pas de rythme imposé : j'écris, vous lisez.</p>
  {% include /plugins/newsletter.html %}
</aside>

<p class="u-text--center">J'ai parlé Web Components &amp; accessibilité RGAA à <a href="/conference-les-web-components-et-accessibilite.html">Paris-Web 2025</a> · ex-coureur cycliste (pro chez Bretagne Schuller, 2008-2010), 5 participations aux championnats de France FFC, des catégories jeunes à l'élite · je construis sur le web depuis une vingtaine d'années.</p>

Tous les envois sont publics → [voir les archives](https://mails.nicolasjouanno.com)

<p class="u-text--center"><img class="c-avatar c-avatar--xlarge" src="/images/icons/avatar.svg" alt="Portrait de Nicolas Jouanno" /></p>

<div class="u-text--center">
  <ul class="u-flex u-flex--center u-spacing--0">
    <li>
      <a href="{{ site.author.twitter }}" class="c-button c-button--icon c-button--large" aria-label="X (Twitter) — @bynicolasjd" target="_blank" rel="noopener">
        <span class="c-icon">{% include icons/x.svg %}</span>
      </a>
    </li>
    <li>
      <a href="{{ site.author.linkedin }}" class="c-button c-button--icon c-button--large" aria-label="LinkedIn — Nicolas Jouanno" target="_blank" rel="noopener">
        <span class="c-icon">{% include icons/linkedin.svg %}</span>
      </a>
    </li>
    <li>
      <a href="{{ site.author.github }}" class="c-button c-button--icon c-button--large" aria-label="GitHub — jn-prod" target="_blank" rel="noopener">
        <span class="c-icon">{% include icons/github.svg %}</span>
      </a>
    </li>
  </ul>
</div>

<h2 id="about">👋 Qui suis-je ?</h2>

Ça fait une vingtaine d'années que je [publie]({{ site.url }}/posts.html) et [construis des applications]({{ site.url }}/work.html) sur le web. Ancien [cycliste professionnel]({{ site.url }}/results.html), j'aborde le code comme l'entraînement : des composants qu'on réutilise plutôt qu'on refait, des sites qui durent plus longtemps qu'une mode, du web qu'on garde la main dessus.

- 📍 Basé à Pontivy, en Bretagne
- 🌱 Je préfère retirer que rajouter
- ⛰️ VTT, trail, van : endurance et soin du détail

## 🛠️ Ce sur quoi je travaille

**Design system, au quotidien.** Je suis Lead développeur frontend chez [MGDIS](https://github.com/MGDIS/core-ui). Je fais vivre leur design system — Web Components / StencilJS, accessibilité RGAA — et j'épaule les équipes qui l'utilisent. J'en ai parlé sur scène à [Paris-Web 2025](/conference-les-web-components-et-accessibilite.html). L'IA fait partie de mes outils de tous les jours.

**Systèmes agentiques, en side project.** Le soir, je construis des systèmes agentiques : orchestration d'agents, mémoire, gouvernance par décisions. Je les fabrique pour comprendre comment ça tient debout. C'est ce qui m'occupe en ce moment.

**[{{ site.projects.vtt_bzh.name }}]({{ site.projects.vtt_bzh.url }}).** Le calendrier des randos VTT en Bretagne que j'ai lancé en 2013, et que je fais tourner depuis. 12 000 vues par mois : mon terrain d'essai technique grandeur nature.

<a href="/work.html" class="c-button c-button--dark-outline">Voir mon parcours professionnel →</a>

## 🚴 Sport & outdoor

Cycliste professionnel sous les couleurs de Bretagne Schuller (2008–2010). Depuis, j'ai quitté le bitume pour les sentiers : VTT, trail, et l'Europe en van avec la famille. Le sport reste mon fil conducteur — la régularité et l'endurance, je les retrouve devant l'écran.

<a href="/results.html" class="c-button c-button--dark-outline">Voir mon parcours sportif →</a>

## 🌾 Sans gluten

Parent d'un enfant cœliaque, je vis le sans-gluten comme une nécessité, à chaque repas. À force de lire des étiquettes et de déjouer des pièges, j'ai accumulé des repères concrets — et je construis des outils pour s'y retrouver. Du vécu de tous les jours, pas un avis médical.

<a href="/sans-gluten.html" class="c-button c-button--dark-outline">Vivre sans gluten →</a>

## 📝 Derniers articles

<ul>
  {% for post in site.posts limit:3 %}
  <li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%Y" }})</li>
  {% endfor %}
</ul>

<a href="/posts.html" class="c-button c-button--dark-outline">Lire tous les articles →</a>

<aside class="c-card c-card--flat c-card--medium">
  <h2>🌱 Esprit slow web</h2>
  <p>Ici, pas d'algorithme, pas de pub, pas de pistage. <strong>Vous choisissez comment et quand me suivre.</strong> Votre attention n'est pas un produit que je revends : c'est un temps que vous me donnez, et je le respecte.</p>
  <p>Pas de plateforme entre nous. Tout part d'ici, sur mon propre site, et y reste.</p>
</aside>
