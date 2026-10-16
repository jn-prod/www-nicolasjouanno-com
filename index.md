---
title: Nicolas Jouanno — Outdoor, voyage et sans gluten
layout: landing
description: Des chemins, du matériel et des idées pour passer plus de temps dehors. Ici, le vécu compte plus que le chrono.
permalink: /index.html
script: /assets/share.js
---

<header class="c-profile">
  <div class="c-profile__identity">
    <img class="c-avatar c-avatar--medium" src="/images/nicolas-jouanno.jpg" alt="Portrait de Nicolas Jouanno" width="96" height="96" />
    <hgroup class="c-profile__heading">
      <h1>{{ site.title }}</h1>
      <p>{{ site.author.handle }}</p>
    </hgroup>
  </div>

  <p class="c-profile__description">
    Des chemins, du matériel et des idées pour passer plus de temps dehors.<br>
    Ici, le vécu compte plus que le chrono.<br>
    <span aria-hidden="true">⏮️</span> Ex-cycliste pro.
    <span aria-hidden="true">🚵</span> Créateur de <a href="{{ site.projects.vtt_bzh.url }}">vtt.bzh</a>.<br>
    <span aria-hidden="true">🇪🇺</span> Europe en famille, en van.
    <span aria-hidden="true">🌱</span> Assiettes sans gluten.
  </p>

  <ul class="c-meta-list c-meta u-list">
    <li class="c-meta-list__item">
      {% include components/icon.html name="location" size="text" %}
      <span>Bretagne, France</span>
    </li>
    <li class="c-meta-list__item">
      <a class="c-meta-list__link" href="/a-propos/">
        {% include components/icon.html name="calendar" size="text" %}
        <span>En ligne depuis 2005</span>
      </a>
    </li>
  </ul>

  <div class="c-button-stack">
    <a class="c-button c-button--dark-outline" href="mailto:{{ site.author.email }}">Contact</a>
    <button class="c-button c-button--dark-outline" type="button" data-share-profile hidden>Partager</button>
  </div>
</header>

{% include components/newsletter-form.html id="home" title="Recevoir La Sortie" description="Une fois par mois, une photo, un vécu et ce qui mérite l’attention dehors." note="Désabonnement en un clic." variant="compact" %}

{% include components/channel-navigation.html %}

{% assign home_posts = site.posts | where_exp: "post", "post.category != 'archive'" %}
{% assign home_pins = home_posts | where: "pin", true %}
{% assign home_rest = home_posts | where_exp: "post", "post.pin != true" %}

<h2 class="u-visually-hidden" id="publications">Publications</h2>
<ul class="u-list c-section__post-list">
  {% for post in home_pins limit: 1 %}
    <li class="c-section__post-item">{% include components/post.html post=post %}</li>
  {% endfor %}
  {% for post in home_rest limit: 4 %}
    <li class="c-section__post-item">{% include components/post.html post=post %}</li>
  {% endfor %}
</ul>

<p class="u-spacing--block-start-medium"><a href="/posts.html" class="c-button c-button--dark-outline">Voir toutes les publications</a></p>
