---
title: "Nicolas Jouanno — récits, guides et outils outdoor"
layout: page
description: "Ancien cycliste professionnel, je voyage en van en famille à travers l'Europe, avec VTT et trail au programme. Récits, guides et outils outdoor depuis Pontivy."
permalink: /index.html
breadcrumb_hide: true
---

<hgroup class="u-text--center">
  <h1><span class="u-visually-hidden">{{ site.title }}. </span>100% VTT, trail, sans gluten</h1>
  <p>Salut, moi c'est Nicolas. J'écris sur le VTT, le trail et le sans gluten à partir de ce que je pratique et construis.</p>
</hgroup>

<p class="u-text--center"><img class="c-avatar c-avatar--xlarge" src="/images/nicolas-jouanno.webp" alt="Portrait de Nicolas Jouanno" width="256" height="256" /></p>

Le vélo a d'abord donné le rythme. J'ai été [cycliste professionnel]({{ site.url }}/me/results.html?utm_source=home&utm_medium=proof&utm_campaign=site_hub) chez Bretagne Schuller et j'ai pris part à cinq championnats de France, avant qu'une blessure ne m'oblige à arrêter.

Aujourd'hui, je ralentis. Avec ma famille, nous parcourons l'Europe en van au rythme des vacances. Le VTT, la randonnée et le trail font partie des étapes, au plus près des sentiers.

Ici, je partage ce que ces sorties et ces voyages me laissent : des récits, des guides et les outils que je construis lorsqu'ils répondent à un besoin concret. Le tout depuis Pontivy, en Bretagne.

<p><a href="/me/?utm_source=home&utm_medium=proof&utm_campaign=site_hub" class="c-button c-button--dark-outline">Mon parcours →</a></p>

## Accès directs

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

Ici, pas d'algorithme, pas de publicité ni de profilage publicitaire. **Vous choisissez comment et quand me suivre.** Votre attention n'est pas un produit que je revends : c'est un temps que vous me donnez. Je le respecte.

Ce site reste mon archive de référence. Substack en propose une copie publique complète et permet d'être notifié des prochaines publications.

<aside id="follow" class="c-card c-card--neutral c-card--medium">
  <h2>📬 Suivre mes publications</h2>
  <p>Les 47 publications de cette archive sont aussi disponibles sur Substack. Suivez-moi là-bas pour être notifié des nouveaux textes ; ce site reste leur source de référence.</p>
  {% include /plugins/newsletter.html %}
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
