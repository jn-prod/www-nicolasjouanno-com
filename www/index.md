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
title: "Nicolas Jouanno — VTT, trail & sans gluten au quotidien"
layout: page
description: "Ancien cycliste pro passé au VTT et au trail, parent d'un enfant cœliaque. Outdoor en famille, alimentation sans gluten au quotidien, et un web à vitesse humaine."
permalink: /index.html
breadcrumb_hide: true
signature: true
---

<hgroup class="u-text--center">
  <h1><span class="u-visually-hidden">{{ site.title }} — </span>Sport, outdoor & alimentation sans gluten</h1>
  <p>Salut, moi c'est Nicolas. Ex-cycliste pro passé aux sentiers, parent d'un enfant cœliaque. Je roule, je cours, je voyage en van en famille — et le sans-gluten rythme nos repas.</p>
</hgroup>

<aside id="follow" class="c-card c-card--neutral c-card--large">
  <h2>📬 Un email quand je publie</h2>
  <p>VTT et outdoor, alimentation sans gluten, et mes notes de bidouille web. Aucun rythme imposé : j'écris quand j'ai quelque chose à dire, vous lisez quand vous voulez.</p>
  {% include /plugins/newsletter.html %}
</aside>

<p class="u-text--center">Ex-coureur cycliste — pro chez Bretagne Schuller (2008–2010), 5 participations aux championnats de France, des catégories jeunes à l'élite. Aujourd'hui : VTT, trail et l'Europe en van, en famille.</p>

Tous les envois sont publics → [voir les archives](https://mails.nicolasjouanno.com)

<p class="u-text--center"><img class="c-avatar c-avatar--xlarge" src="/images/icons/avatar.svg" alt="Portrait de Nicolas Jouanno" /></p>

<div class="u-text--center">
  <ul class="u-flex u-flex--center u-list">
    <li>
      <a href="{{ site.author.twitter }}" class="c-button c-button--icon c-button--large" aria-label="X (Twitter) — @bynicolasjd" target="_blank" rel="noopener">
        <span class="c-icon">{% include icons/x.svg %}</span>
      </a>
    </li>
    <li>
      <a href="{{ site.author.instagram }}" class="c-button c-button--icon c-button--large" aria-label="Instagram — @bynicolasjd" target="_blank" rel="noopener">
        <span class="c-icon">{% include icons/instagram.svg %}</span>
      </a>
    </li>
    <li>
      <a href="{{ site.author.youtube }}" class="c-button c-button--icon c-button--large" aria-label="YouTube — @byNicolasJD" target="_blank" rel="noopener">
        <span class="c-icon">{% include icons/youtube.svg %}</span>
      </a>
    </li>
  </ul>
</div>

<h2 id="about">👋 Qui suis-je ?</h2>

Ancien [cycliste professionnel]({{ site.url }}/results.html), j'ai troqué le bitume pour les sentiers — VTT, trail, van en famille à travers l'Europe. Parent d'un enfant cœliaque, le sans-gluten rythme nos repas. Et je [publie]({{ site.url }}/posts.html) sur ce coin de web depuis une vingtaine d'années, à vitesse humaine.

- 📍 Basé à Pontivy, en Bretagne
- 🌱 Je préfère retirer que rajouter
- ⛰️ VTT, trail, van : endurance et soin du détail

## 🚴 Outdoor

Cycliste professionnel sous les couleurs de Bretagne Schuller (2008–2010). Depuis, j'ai quitté le bitume pour les sentiers : VTT, trail, l'Europe en van en famille. Le sport est resté mon fil conducteur — cette régularité et cette endurance, je les retrouve aujourd'hui devant l'écran.

Un temps fort : [ma Megavalanche 2013](/ma-megavalanche-2013-alpe-dhuez.html) à l'Alpe d'Huez — 2 500 m de dénivelé négatif depuis le Pic Blanc (3 300 m).

Côté communauté, j'anime [{{ site.projects.vtt_bzh.name }}]({{ site.projects.vtt_bzh.url }}) — le calendrier des randos VTT en Bretagne, 12 000 vues/mois.

<a href="/results.html" class="c-button c-button--dark-outline">Voir mon parcours sportif →</a>

## 🌾 Nutrition

Parent d'un enfant cœliaque, je vis le sans-gluten comme une nécessité, à chaque repas. À force de lire des étiquettes et de déjouer des pièges, j'ai accumulé des repères concrets — et je construis des outils pour s'y retrouver. Du vécu de tous les jours, pas un avis médical.

<a href="/nutrition.html" class="c-button c-button--dark-outline">Le sans-gluten au quotidien →</a>

## 📝 Derniers articles

<ul class="u-list">
  {% for post in site.posts limit:3 %}
  <li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%Y" }})</li>
  {% endfor %}
</ul>

<a href="/posts.html" class="c-button c-button--dark-outline">Lire tous les articles →</a>

<aside class="c-card c-card--flat c-card--medium">
  <h2>🌱 Esprit slow web</h2>
  <p>Ici, pas d'algorithme, pas de pub, pas de pistage. <strong>Vous choisissez comment et quand me suivre.</strong> Votre attention n'est pas un produit que je revends : c'est un temps que vous me donnez. Je le respecte.</p>
  <p>Pas de plateforme entre nous. Tout part d'ici, sur mon propre site, et y reste.</p>
  <p><a href="/slow-web.html" class="c-button c-button--dark-outline">Le web possédé, à vitesse humaine →</a></p>
</aside>
