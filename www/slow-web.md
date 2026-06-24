---
layout: page
title: "Slow web — un web possédé, à vitesse humaine"
description: "Pourquoi je publie sur mon propre site plutôt que sur une plateforme louée : owned, POSSE, slow web. Un web durable, sans algorithme ni course à la cadence."
permalink: /slow-web.html
---

<h1>Slow web — un web à vitesse humaine</h1>

Depuis 2008, je publie sur **mon propre site**, pas sur une plateforme louée. Pas par nostalgie : parce qu'un site qu'on possède est un **coffre** — il ne disparaît pas le jour où une plateforme ferme, change ses règles ou son algorithme. Ce qu'on y écrit nous appartient, et y reste.

C'est ce que j'appelle le **slow web** : un web à **vitesse humaine**, durable, sans pub ni pistage, où l'on écrit quand on a quelque chose à dire — pas pour nourrir une cadence. Tout part d'ici, et y reste.

## Web possédé & numérique à vitesse humaine

<ul class="u-list c-section__post-list">
  {% for post in site.categories['Slow web'] %}
  <li class="c-section__post-item">{% include /components/post.html %}</li>
  {% endfor %}
</ul>

<aside class="c-card c-card--neutral c-card--large u-spacing--block-start-medium">
  <p>Si le web possédé, l'<em>owned</em> et le slow vous parlent, je l'écris au fil de l'eau :</p>
  {% include /plugins/newsletter.html %}
</aside>
