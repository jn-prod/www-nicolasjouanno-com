---
layout: page
title: Life — sport, sans gluten, van life & minimalisme
description: "L'univers perso de Nicolas Jouanno : sport & outdoor, sans gluten (parent d'un enfant cœliaque), van life en famille et minimalisme numérique."
permalink: /life.html
---

# Life

Hors du travail, c'est ici : ce qui me fait avancer en dehors du clavier. **Sport et outdoor**, **cuisine sans gluten**, **van life** en famille à travers l'Europe, minimalisme numérique — à vitesse humaine.

## 🚴 Sport & outdoor

Ancien cycliste professionnel, j'ai troqué le bitume pour les sentiers : VTT, trail, et maintenant l'Europe en van avec la famille. Régularité, endurance, soin du détail.

<a href="/results.html" class="c-button c-button--dark-outline">Mon parcours sportif & outdoor →</a>

## 🌾 Sans gluten

Parent d'un enfant cœliaque, je construis des outils de sensibilisation et je partage mes repères concrets pour vivre sans gluten au quotidien.

<a href="/sans-gluten.html" class="c-button c-button--dark-outline">Le hub sans gluten →</a>

## Au fil de l'eau

<ul class="c-section__post-list">
  {% for post in site.categories.Perso %}
  <li class="c-section__post-item">{% include /components/post.html %}</li>
  {% endfor %}
</ul>

## Suivre

Van life, minimalisme, sans gluten, sport — si ça te parle, je partage au fil de l'eau dans ma newsletter :

{% include /plugins/newsletter.html %}
