---
title: "100% VTT, trail, sans gluten — récits, guides & outils outdoor"
layout: page
description: "Ancien cycliste professionnel passé aux sentiers, parent d'un enfant cœliaque. Des récits de sorties, des guides qui marchent et des outils que j'utilise vraiment."
permalink: /index.html
breadcrumb_hide: true
signature: true
---

<hgroup class="u-text--center">
  <h1><span class="u-visually-hidden">{{ site.title }}. </span>100% VTT, trail, sans gluten</h1>
  <p>Salut, moi c'est Nicolas. Je partage mon expérience outdoor à travers les récits, guides et outils dont je suis l'auteur.</p>
</hgroup>

<p class="u-text--center"><img class="c-avatar c-avatar--xlarge" src="/images/nicolas-jouanno.webp" alt="Portrait de Nicolas Jouanno" width="256" height="256" /></p>

Avant l'écran, il y a eu le vélo : [cycliste professionnel]({{ site.url }}/me/results.html) chez Bretagne Schuller, cinq championnats de France, puis une blessure qui m'a mis hors course. J'ai quitté le bitume pour les sentiers, en famille — VTT, trail, l'Europe en van. Le jour, je suis [lead développeur frontend]({{ site.url }}/me/work/) ; le soir, je construis des outils. Le tout depuis Pontivy, en Bretagne.

<p><a href="/me/" class="c-button c-button--dark-outline">Mon parcours →</a></p>

## Par où commencer

<!-- TODO copywriter (D-2026-06-11-001) — reprend l'axe FORMAT du header -->

- **[Récits](/recits.html)** — ce qui s'est réellement passé, à la première personne : une Megavalanche, un premier trail, un premier 10 km.
- **[Guides](/guides.html)** — comment faire : régler ses suspensions, bâtir un plan d'entraînement, manger avant l'effort.
- **[Outils](/outils.html)** — le calendrier vtt.bzh, feezify, le quiz gluten.

## Ce dont je parle

<!-- TODO copywriter (D-2026-06-11-001) — reprend l'axe VERTICALE du footer -->

- **[VTT](/vtt/)** — la verticale la plus fournie : réglages, matériel, entraînement, sorties.
- **[Trail](/trail/)** — arrivé tard à la course à pied, et c'est ce qui m'intéresse : recommencer débutant.
- **[Nutrition](/nutrition/)** — le ravitaillement d'effort d'un côté, le sans-gluten du quotidien de l'autre. Parent d'un enfant cœliaque, je le vis des deux côtés.
- **[Projets](/projets/)** — ce que je construis, ce que ça m'apprend, ce que ça devient.

## 🚵 vtt.bzh — le calendrier des randos VTT en Bretagne

Toutes les randos VTT organisées en Bretagne, tenues à jour par les clubs eux-mêmes. Environ 12 000 vues par mois. C'est le projet que j'anime à côté du site.

<p><a href="{{ site.projects.vtt_bzh.url }}" class="c-button c-button--dark-outline">Ouvrir le calendrier →</a></p>

## 🌱 Esprit slow web

Ici, pas d'algorithme, pas de pub, pas de pistage. **Vous choisissez comment et quand me suivre.** Votre attention n'est pas un produit que je revends : c'est un temps que vous me donnez. Je le respecte.

Pas de plateforme entre nous. Tout part d'ici, sur mon propre site, et y reste.

<aside id="follow" class="c-card c-card--flat c-card--medium">
  <h2>📬 Un email quand je publie</h2>
  <div class="c-card c-card--neutral c-card--small">
    <p>VTT, trail, sans gluten et les projets que je bricole. Aucun rythme imposé : j'écris quand j'ai quelque chose à dire, vous lisez quand vous voulez.</p>
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
