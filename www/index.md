---
title: "100% VTT, trail, sans gluten — récits, guides & outils outdoor"
layout: page
description: "Ancien cycliste professionnel, je voyage en van en famille à travers l'Europe, avec VTT et trail au programme. Récits, guides et outils outdoor depuis Pontivy."
permalink: /index.html
breadcrumb_hide: true
signature: true
---

<hgroup class="u-text--center">
  <h1><span class="u-visually-hidden">{{ site.title }}. </span>100% VTT, trail, sans gluten</h1>
  <p>Salut, moi c'est Nicolas. J'écris sur le VTT, le trail et le sans gluten à partir de ce que je pratique et construis.</p>
</hgroup>

<p class="u-text--center"><img class="c-avatar c-avatar--xlarge" src="/images/nicolas-jouanno.webp" alt="Portrait de Nicolas Jouanno" width="256" height="256" /></p>

Le vélo a d'abord donné le rythme : [cycliste professionnel]({{ site.url }}/me/results.html) chez Bretagne Schuller, cinq championnats de France, puis une blessure qui m'a mis hors course. J'ai quitté le bitume pour les sentiers : VTT, trail et l'Europe en van en famille. Ce site part de là : du sport vécu, des sorties qui laissent une trace, et des outils construits parce qu'ils me servent vraiment. Le tout depuis Pontivy, en Bretagne.

<p><a href="/me/" class="c-button c-button--dark-outline">Mon parcours →</a></p>

## Par où commencer

<!-- TODO copywriter (D-2026-06-11-001) — reprend l'axe FORMAT du header -->

- **[Récits](/recits.html)** — ce qui s'est réellement passé, à la première personne : des souvenirs de cycliste professionnel, une Megavalanche, un premier trail.
- **[Guides](/guides.html)** — comment faire : régler ses suspensions, bâtir un plan d'entraînement, manger avant l'effort.
- **[Outils](/outils.html)** — le calendrier vtt.bzh, feezify, le quiz gluten.

## Ce dont je parle

<!-- TODO copywriter (D-2026-06-11-001) — reprend l'axe VERTICALE du footer -->

<ul>
  {% for verticale in site.data.taxonomie.verticales %}
    {% if verticale.include_home and verticale.status == "active" %}
      <li><strong><a href="{{ verticale.permalink }}">{{ verticale.label }}</a></strong> — {{ verticale.home_description }}</li>
    {% endif %}
  {% endfor %}
</ul>

## 🚵 vtt.bzh — le calendrier des randos VTT en Bretagne

Toutes les randos VTT organisées en Bretagne, tenues à jour par les clubs eux-mêmes. Environ 12 000 vues par mois. C'est le projet que j'anime à côté du site.

<p><a href="{{ site.projects.vtt_bzh.url }}" class="c-button c-button--dark-outline">Ouvrir le calendrier →</a></p>

## 🌱 Esprit slow web

Ici, pas d'algorithme, pas de pub, pas de pistage. **Vous choisissez comment et quand me suivre.** Votre attention n'est pas un produit que je revends : c'est un temps que vous me donnez. Je le respecte.

Pas de plateforme entre nous. Tout part d'ici, sur mon propre site, et y reste.

<aside id="follow" class="c-card c-card--flat c-card--medium">
  <h2>📬 Un email quand je publie</h2>
  <div class="c-card c-card--neutral c-card--small">
    <p>{% assign home_verticales = site.data.taxonomie.verticales | where: "include_home", true | where: "status", "active" %}{% for verticale in home_verticales %}{% if forloop.first %}{{ verticale.label }}{% elsif forloop.last %} et {{ verticale.label | downcase }}{% else %}, {{ verticale.label | downcase }}{% endif %}{% endfor %}. Aucun rythme imposé : j'écris quand j'ai quelque chose à dire, vous lisez quand vous voulez.</p>
    {% include /plugins/newsletter.html %}
  </div>
  <p>Tous les envois sont publics → <a href="https://mails.nicolasjouanno.com">voir les archives</a></p>
  <h3>📝 Derniers articles</h3>
  <ul class="u-list">
    {% assign public_posts = site.posts | where_exp: "post", "post.archive != true" %}
    {% assign shown_count = 0 %}
    {% for post in public_posts %}
      {% unless post.categories contains "Work" %}
        <li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%Y" }})</li>
        {% assign shown_count = shown_count | plus: 1 %}
        {% if shown_count == 3 %}{% break %}{% endif %}
      {% endunless %}
    {% endfor %}
  </ul>
  <p><a href="/posts.html" class="c-button c-button--dark-outline">Lire tous les articles →</a></p>
</aside>
