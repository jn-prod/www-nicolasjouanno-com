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
title: "Lead développeur frontend — du design system aux systèmes agentiques"
layout: page
description: "Hub personnel de Nicolas Jouanno : Lead développeur frontend (design system, Web Components, accessibilité RGAA), orateur Paris-Web 2025. J'explore les systèmes agentiques en side project."
permalink: /index.html
breadcrumb_hide: true
signature: true
---

<hgroup class="u-text--center">
  <h1>{{ site.title }} — Lead développeur frontend</h1>
  <p>Salut, moi c'est Nicolas. Le jour, je conçois des design systems ; le soir, j'explore les systèmes agentiques. Même discipline d'ingénierie, deux échelles.</p>
</hgroup>

<h2 id="follow">📬 Recevez ma newsletter et mes derniers articles</h2>

{% include /plugins/newsletter.html %}

<p class="u-text--center">Orateur à <a href="/conference-les-web-components-et-accessibilite.html">Paris-Web 2025</a> (Web Components &amp; accessibilité RGAA) · ex-cycliste pro, 5 championnats de France disputés · je construis pour le web depuis une vingtaine d'années.</p>

Tous les envois sont publics → [voir les archives](https://mails.nicolasjouanno.com)

<img class="u-image u-image-center u-image--large" src="/images/icons/avatar.svg" alt="Portrait de Nicolas Jouanno" />

<div class="u-text--center">
  <ul class="u-list u-list--none u-list--inline">
    <li>
      <a href="{{ site.author.twitter }}" class="c-button c-button--icon c-button--large" aria-label="X (Twitter) — @bynicolasjd" target="_blank" rel="noopener">
        <span class="icon">{% include icons/x.svg %}</span>
      </a>
    </li>
    <li>
      <a href="{{ site.author.linkedin }}" class="c-button c-button--icon c-button--large" aria-label="LinkedIn — Nicolas Jouanno" target="_blank" rel="noopener">
        <span class="icon">{% include icons/linkedin.svg %}</span>
      </a>
    </li>
    <li>
      <a href="{{ site.author.github }}" class="c-button c-button--icon c-button--large" aria-label="GitHub — jn-prod" target="_blank" rel="noopener">
        <span class="icon">{% include icons/github.svg %}</span>
      </a>
    </li>
  </ul>
</div>

<h2 id="about">👋 Qui suis-je ?</h2>

Ça fait une vingtaine d'années que je [publie]({{ site.url }}/posts.html) et [construis des applications]({{ site.url }}/work.html) sur le web. Ancien [cycliste professionnel]({{ site.url }}/results.html), je cherche surtout à le rendre plus humain, plus simple et plus durable.

- 📍 Pontivy, Bretagne
- 🌱 Minimalisme
- ⛰️ Aventure, Endurance & Discipline

## 🛠️ Ce sur quoi je travaille

**Design system, au quotidien.** Je suis Lead développeur frontend chez [MGDIS](https://github.com/MGDIS/core-ui) : je fais vivre leur design system (Web Components / StencilJS, accessibilité RGAA, à l'échelle) et j'accompagne les équipes qui l'implémentent. J'en ai parlé sur scène à [Paris-Web 2025](/conference-les-web-components-et-accessibilite.html). L'IA fait partie de mes outils du quotidien.

**Systèmes agentiques, en side project.** Le soir, j'explore les systèmes agentiques : orchestration d'agents, mémoire, gouvernance par décisions. Je les construis pour apprendre. C'est ce qui m'occupe en ce moment.

**[{{ site.projects.vtt_bzh.name }}]({{ site.projects.vtt_bzh.url }}).** Le calendrier des randos VTT en Bretagne que j'ai lancé en 2013 — mon labo d'expérimentation technique grandeur nature. 12 000 vues/mois.

<a href="/work.html" class="c-button c-button--dark-outline">Parcours professionnel complet →</a>

## 🚴 Sport & outdoor

Cycliste professionnel sous les couleurs de Bretagne Schuller (2008–2010). Depuis, j'ai troqué le bitume pour les sentiers — VTT, trail, et maintenant l'Europe en van avec la famille. Le sport reste mon fil conducteur : régularité, endurance, soin du détail.

<a href="/results.html" class="c-button c-button--dark-outline">Parcours sportif & outdoor →</a>

## 📝 Derniers articles

<ul>
  {% for post in site.posts limit:3 %}
  <li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%Y" }})</li>
  {% endfor %}
</ul>

<a href="/posts.html" class="c-button c-button--dark-outline">Tous les articles →</a>

## 🌱 Esprit slow web

Ici, pas d'algorithme, pas de pub, pas de pistage. **Vous choisissez comment et quand me suivre.** Une approche **minimaliste, durable et indépendante** : votre attention n'est pas un produit, c'est un cadeau que je respecte.

Internet, pour moi, c'est un espace de liberté. Tout se passe ici, où je partage mon travail.
