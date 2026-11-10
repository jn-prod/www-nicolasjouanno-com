---
title: Nicolas Jouanno — La Sortie, la lettre outdoor d'un ancien cycliste pro
layout: landing
description: "Nicolas Jouanno, ancien cycliste pro : La Sortie, la lettre mensuelle pour retrouver le plaisir de sortir librement, et ses archives depuis 2005."
permalink: /index.html
script: /assets/share.js
---

<header class="c-profile h-card">
  <div class="c-profile__identity">
    <img class="c-avatar c-avatar--medium u-photo" src="/images/nicolas-jouanno.jpg" alt="Portrait de Nicolas Jouanno" width="96" height="96" />
    <hgroup class="c-profile__heading">
      <h1 class="p-name">{{ site.title }}</h1>
      <p class="p-nickname">{{ site.author.handle }}</p>
      <data class="u-url u-uid" value="{{ site.url }}/"></data>
    </hgroup>
  </div>

  <p class="c-profile__description p-note">
    Retrouver le plaisir de sortir, librement : chaque mois dans <a href="{{ site.plateformes.substack.url }}">La Sortie</a>, une idée, un vécu, quelques lectures.<br>
    <span aria-hidden="true">⏮️</span> <a href="/results.html">Ex-cycliste pro</a>.
    <span aria-hidden="true">🌱</span> <a href="/apps/gluten-not-gluten/">Assiettes sans gluten</a>.
  </p>

  {% assign now_page = site.pages | where: "permalink", "/now/" | first %}
  {% assign published_posts = site.posts | where_exp: "post", "post.category != 'archive'" %}
  <ul class="c-meta-list c-meta u-list">
    <li class="c-meta-list__item">
      {% include components/icon.html name="location" %}
      <span class="p-adr h-adr"><span class="p-region">Bretagne</span>, <span class="p-country-name">France</span></span>
    </li>
    <li class="c-meta-list__item">
      <a class="c-meta-list__link" href="/about/">
        {% include components/icon.html name="calendar" %}
        <span>En ligne depuis 2005</span>
      </a>
    </li>
    <li class="c-meta-list__item">
      <a class="c-meta-list__link" href="/blogroll/">
        <span><strong>{{ site.data.blogroll | size }}</strong> abonnement{% if site.data.blogroll.size > 1 %}s{% endif %}</span>
      </a>
    </li>
    {%- if site.plateformes.facebook %}
    <li class="c-meta-list__item">
      <a class="c-meta-list__link" href="{{ site.plateformes.facebook.url }}" target="_blank" rel="noopener">
        <span><strong>{{ site.plateformes.facebook.abonnes }}</strong> abonnés<span class="u-visually-hidden"> sur Facebook</span></span>
      </a>
    </li>
    {%- endif %}
    <li class="c-meta-list__item">
      <a class="c-meta-list__link" href="/posts.html">
        <span><strong>{{ published_posts | size }}</strong> publication{% if published_posts.size > 1 %}s{% endif %}</span>
      </a>
    </li>
  </ul>

  {% if now_page.status %}
  <p class="c-profile__status c-meta">
    <a href="/now/">En ce moment : {{ now_page.status }}</a> <time datetime="{{ now_page.updated | date: '%Y-%m-%d' }}">({{ now_page.updated | date: "%d/%m/%Y" }})</time>
  </p>
  {% endif %}

  <div class="c-button-stack">
    {%- if site.plateformes.substack %}
    <a class="c-button c-button--brand" href="{{ site.plateformes.substack.subscribe }}">Suivre</a>
    {%- endif %}
    <a class="c-button c-button--dark-outline u-email" href="mailto:{{ site.author.email }}">Contact</a>
    <button class="c-button c-button--dark-outline" type="button" data-share-profile hidden>Partager</button>
  </div>
</header>

{% include components/channel-navigation.html %}

{%- comment -%} Les derniers posts de La Sortie, flux du module Substack (_data/flux/substack.json). {%- endcomment -%}
<h2 class="u-visually-hidden" id="publications">Publications</h2>
<ul class="c-post-list h-feed">
  {% for post in site.data.flux.substack limit: 5 %}
    <li>{% include components/post.html post=post %}</li>
  {% endfor %}
</ul>

{% if site.plateformes.substack %}<p class="u-spacing--block-start-medium"><a href="{{ site.plateformes.substack.archive }}" class="c-button c-button--dark-outline">Toutes les publications sur Substack</a></p>{% endif %}
