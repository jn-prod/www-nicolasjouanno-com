---
layout: page
title: Sport, sans gluten & van life — le perso de Nicolas Jouanno
description: "Loin du clavier : sport & outdoor (ancien cycliste pro), cuisine sans gluten (parent d'un enfant cœliaque), van life en famille en Europe et minimalisme numérique."
permalink: /life.html
---

# Life

Ce qui me fait avancer loin du clavier. **Sport et outdoor**, **cuisine sans gluten**, **van life** en famille à travers l'Europe, minimalisme numérique — à vitesse humaine.

## 🚴 Sport & outdoor

Ancien cycliste professionnel, j'ai quitté le bitume pour les sentiers : VTT, trail, et maintenant l'Europe en van avec la famille. Régularité, endurance, soin du détail.

<a href="/results.html" class="c-button c-button--dark-outline">Mon parcours sportif & outdoor →</a>

## 🌾 Sans gluten

Parent d'un enfant cœliaque, je construis des outils de sensibilisation et je partage mes repères concrets pour vivre sans gluten au quotidien.

<a href="/sans-gluten.html" class="c-button c-button--dark-outline">Le hub sans gluten →</a>

## Au fil de l'eau

<ul class="u-list c-section__post-list">
  {% for post in site.categories.Perso %}
  <li class="c-section__post-item">{% include /components/post.html %}</li>
  {% endfor %}
</ul>

<aside class="c-card c-card--neutral c-card--large">
  <h2>Suivre</h2>
  <p>Van life, minimalisme, sans gluten, sport — si ça vous parle, je le raconte au fil de l'eau dans ma newsletter :</p>
  {% include /plugins/newsletter.html %}
</aside>
