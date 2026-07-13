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
  <p>Salut, moi c'est Nicolas. Je suis un sportif, créateur, père et développeur.</p>
</hgroup>

<p class="u-text--center"><img class="c-avatar c-avatar--xlarge" src="/images/nicolas-jouanno.webp" alt="Portrait de Nicolas Jouanno" width="256" height="256" /></p>

<h2 id="about">👋 Qui suis-je ?</h2>

Avant l'écran, il y a eu le vélo. J'ai [couru en professionnel]({{ site.url }}/results.html) chez Bretagne Schuller, de 2008 à 2010, et disputé cinq championnats de France, des catégories jeunes jusqu'à l'élite. Une blessure m'a mis hors course, et c'est par cette porte que je suis entré dans le numérique.

Depuis, j'ai quitté le bitume pour les sentiers, [en famille]({{ site.url }}/life.html). Le sport est resté mon fil — cette endurance et ce soin du détail, je les retrouve aujourd'hui devant l'écran.

Ce coin de web, je le tiens depuis une vingtaine d'années, [à vitesse humaine]({{ site.url }}/slow-web.html) — j'y [publie]({{ site.url }}/posts.html) quand j'ai quelque chose à dire, et je préfère toujours retirer que rajouter. Le jour, je suis [lead développeur frontend]({{ site.url }}/work.html) : design system, accessibilité RGAA ; le soir, je construis [feezify]({{ site.url }}/feezify.html), un copilote d'entraînement IA-native, pour comprendre les systèmes agentiques de l'intérieur.

Le tout depuis Pontivy, en Bretagne.

<aside id="follow" class="c-card c-card--flat c-card--medium">
  <h2>📬 Un email quand je publie</h2>
  <div class="c-card c-card--neutral c-card--small">
    <p>VTT et outdoor, alimentation sans gluten, et mes notes de bidouille web. Aucun rythme imposé : j'écris quand j'ai quelque chose à dire, vous lisez quand vous voulez.</p>
    {% include /plugins/newsletter.html %}
  </div>
  <p>Tous les envois sont publics → <a href="https://mails.nicolasjouanno.com">voir les archives</a></p>
  <h3>📝 Derniers articles</h3>
  <ul class="u-list">
    {% for post in site.posts limit:3 %}
    <li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%Y" }})</li>
    {% endfor %}
  </ul>
  <p><a href="/posts.html" class="c-button c-button--dark-outline">Lire tous les articles →</a></p>
</aside>

## 🚴 Outdoor

Le bitume, puis les sentiers : VTT, trail, et l'Europe en van, en famille. Un temps fort : [ma Megavalanche 2013](/ma-megavalanche-2013-alpe-dhuez.html) à l'Alpe d'Huez — 2 500 m de dénivelé négatif depuis le Pic Blanc (3 300 m).

Côté communauté, j'anime [{{ site.projects.vtt_bzh.name }}]({{ site.projects.vtt_bzh.url }}) — le calendrier des randos VTT en Bretagne, 12 000 vues/mois.

<a href="/results.html" class="c-button c-button--dark-outline">Voir mon parcours sportif →</a>

## 🌾 Nutrition

Parent d'un enfant cœliaque, je vis le sans-gluten comme une nécessité, à chaque repas. À force de lire des étiquettes et de déjouer des pièges, j'ai accumulé des repères concrets — et je construis des outils pour s'y retrouver. Du vécu de tous les jours, pas un avis médical.

<a href="/nutrition.html" class="c-button c-button--dark-outline">Le sans-gluten au quotidien →</a>

## 🌱 Esprit slow web

Ici, pas d'algorithme, pas de pub, pas de pistage. **Vous choisissez comment et quand me suivre.** Votre attention n'est pas un produit que je revends : c'est un temps que vous me donnez. Je le respecte.

Pas de plateforme entre nous. Tout part d'ici, sur mon propre site, et y reste.

<a href="/slow-web.html" class="c-button c-button--dark-outline">Le web possédé, à vitesse humaine →</a>
