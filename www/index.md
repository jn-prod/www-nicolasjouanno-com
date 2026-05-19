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
title: "Nicolas Jouanno — développeur frontend, cycliste & outdoor"
layout: page
description: "Hub personnel de Nicolas Jouanno : développeur frontend (MGDIS, design system Web Components), ancien cycliste professionnel reconverti à l'outdoor — VTT, trail, van life en Bretagne."
permalink: /index.html
breadcrumb_hide: true
signature: true
---

<h1 class="u-visually-hidden">{{ site.title }} — développeur frontend, ancien cycliste professionnel, outdoor en famille.</h1>

<img class="u-image u-image-center u-image--large" src="/images/icons/avatar.svg" alt="Portrait de Nicolas Jouanno" />

<p class="u-text--center">Développeur frontend · Cycliste · Outdoor · Bretagne</p>

<ul class="u-list u-list--none u-list--inline u-text--center">
  <li>🗓️ <a href="{{ site.projects.vtt_bzh.url }}">{{ site.projects.vtt_bzh.name }}</a> — 12 000 vues/mois</li>
  <li>🎤 Orateur <a href="/conference-les-web-components-et-accessibilite.html">Paris-Web 2025</a></li>
</ul>

## 📬 Me suivre {#follow}

Gratuite et sans pression.

{% include /plugins/newsletter.html %}

<ul>
  <li>✓ Tous les envois sont publics → <a href="https://mails.nicolasjouanno.com">voir les archives</a></li>
  <li>✓ Aucun spam, désinscription en un clic</li>
  <li>✓ Lue par des développeurs, des sportifs et des curieux du web indépendant</li>
</ul>

### Lire

- 🗒️ [Mes articles](/posts.html) — publications occasionnelles sur des sujets variés
- 📡 [Flux RSS](/feed.xml) ou [JSON Feed](/feed.json) — à ajouter dans Feedly, NetNewsWire, Inoreader… ([guide débutant](https://aboutfeeds.com/))
- 📅 [Flux calendrier (ICS)](/agenda.ics) — sorties, voyages et événements

### Me trouver

<ul class="u-list u-list--none u-list--inline">
  <li>
    <a href="{{ site.author.twitter }}" class="c-button c-button--icon" aria-label="X (Twitter) — @bynicolasjd" target="_blank" rel="noopener">
      <span class="icon">{% include icons/x.svg %}</span>
    </a>
  </li>
  <li>
    <a href="{{ site.author.linkedin }}" class="c-button c-button--icon" aria-label="LinkedIn — Nicolas Jouanno" target="_blank" rel="noopener">
      <span class="icon">{% include icons/linkedin.svg %}</span>
    </a>
  </li>
  <li>
    <a href="{{ site.author.instagram }}" class="c-button c-button--icon" aria-label="Instagram — @bynicolasjd" target="_blank" rel="noopener">
      <span class="icon">{% include icons/instagram.svg %}</span>
    </a>
  </li>
</ul>

<h2 id="about">👋 Qui suis-je ?</h2>

Moi c'est Nicolas. Je [publie]({{ site.url }}/posts.html) et [construis des applications]({{ site.url }}/work.html) sur le web depuis une vingtaine d'années. Ancien [cycliste professionnel]({{ site.url }}/results.html), je cherche des manières de rendre le web plus humain, plus simple et plus durable.

- 📍 Pontivy, Bretagne
- 🌱 Minimalisme
- ⛰️ Aventure, Endurance & Discipline

## 🛠️ Ce sur quoi je travaille

**MGDIS — design system.** Je contribue au design system de [MGDIS](https://github.com/MGDIS/core-ui) : Web Components (StencilJS), accessibilité RGAA, industrialisation frontend à l'échelle. Orateur à [Paris-Web 2025](/conference-les-web-components-et-accessibilite.html) sur ce sujet.

**Explorations IA.** J'explore comment les outils d'IA modifient la pratique du développement. Pas de publication pour l'instant — j'apprends, je construis, j'observe.

**[{{ site.projects.vtt_bzh.name }}]({{ site.projects.vtt_bzh.url }}).** Calendrier des randos VTT en Bretagne lancé en 2013 — laboratoire d'expérimentation technique. 12 000 vues/mois.

<a href="/work.html" class="c-button c-button--dark-outline">Parcours professionnel complet →</a>

## 🚴 Sport & outdoor

Cycliste professionnel sous les couleurs de Bretagne Schuller (2008–2010). Depuis, j'ai troqué le bitume pour les sentiers — VTT, trail, et maintenant l'Europe en van avec la famille. Le sport reste le fil conducteur : régularité, endurance, soin des détails.

<a href="/results.html" class="c-button c-button--dark-outline">Parcours sportif & outdoor →</a>

## 📝 Dernier article

{% assign latest_post = site.posts.first %}
<article class="c-post-card">
  <header class="c-post-card__header">
    <h3 class="c-post-card__header-title"><a href="{{ latest_post.url }}">{{ latest_post.title }}</a></h3>
  </header>
  <p>{{ latest_post.date | date: "%d %B %Y" }}</p>
</article>

<a href="/posts.html" class="c-button c-button--dark-outline">Tous les articles →</a>

## 🌱 Esprit slow web

Ici, pas d'algorithme, pas de pub, pas de suivi intrusif. **Vous choisissez comment et quand suivre mes publications.** C'est une approche **minimaliste, durable et indépendante**. Votre attention n'est pas un produit, c'est un cadeau que je respecte.

Internet est pour moi un espace ouvert de liberté. Tout se passe sur mon site où je partage mon travail.
