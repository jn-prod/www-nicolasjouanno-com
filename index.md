---
title: La Sortie — newsletter outdoor de Nicolas Jouanno
layout: page
description: Des chemins, des voix et des idées pour découvrir la Bretagne. La newsletter mensuelle de Nicolas Jouanno.
permalink: /index.html
---

<h1 class="u-visually-hidden">Derrière La Sortie</h1>

<p class="u-text--center"><img class="c-avatar c-avatar--large" src="/images/nicolas-jouanno.jpg" alt="Portrait de Nicolas Jouanno" width="128" height="128" /></p>

⏮️ Ex-cycliste pro<br>
🇪🇺 J’explore l’Europe en famille, en van<br>
🚵 [vtt.bzh]({{ site.projects.vtt_bzh.url }}) | 🌱 Assiettes sans gluten<br>
📬 Newsletter « La Sortie »

<ul class="c-meta-list c-meta u-list">
  <li class="c-meta-list__item">
    <span class="c-icon c-icon--text">{% include icons/location.svg %}</span>
    <span>Bretagne, France</span>
  </li>
  <li class="c-meta-list__item">
    <span class="c-icon c-icon--text">{% include icons/calendar.svg %}</span>
    <span>En ligne depuis 2005</span>
  </li>
</ul>

{% include components/newsletter-form.html id="home" title="Recevoir La Sortie" %}

{% assign home_posts = site.posts | where_exp: "post", "post.category != 'archive'" %}
{% assign home_pins = home_posts | where: "pin", true %}
{% assign home_rest = home_posts | where_exp: "post", "post.pin != true" %}

<h2 class="u-visually-hidden">Publications</h2>
<ul class="u-list c-section__post-list">
  {% for post in home_pins limit: 1 %}
    <li class="c-section__post-item">{% include components/post.html post=post %}</li>
  {% endfor %}
  {% for post in home_rest limit: 4 %}
    <li class="c-section__post-item">{% include components/post.html post=post %}</li>
  {% endfor %}
</ul>

<p class="u-spacing--block-start-medium"><a href="/posts.html" class="c-button c-button--dark-outline">Voir toutes les publications</a></p>
