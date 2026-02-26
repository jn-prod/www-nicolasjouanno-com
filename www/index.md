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
title: Développeur frontend, ancien cycliste professionnel, photographe de voyage en famille et van life.
layout: page
description: "Développeur frontend et photographe de voyage en famille. Je documente notre vie nomade en van à travers l'Europe : récits, conseils photo et réflexions sur un numérique plus humain."
permalink: /index.html
breadcrumb_hide: true
signature: true
---

<h1 id="about" class="u-visually-hidden">{{ site.title }}. Père d’une famille d’aventuriers. Nous parcourons l’Europe en van.</h1>
<img class="u-image u-image-center u-image--large" src="/images/icons/avatar.svg" alt="" />

👋 Moi c'est Nicolas. Je [publie]({{ site.url }}/posts.html) et [développe des projets]({{ site.url }}/work.html) sur le web depuis une vingtaine d'années. Attentif à notre environnement et à l'impact du numérique, je cherche des manières de rendre le web plus humain, plus simple et plus durable.

Enfant, je découvrais la France au travers des courses cyclistes diffusées à la télévision. C’est en devenant à mon tour [cycliste professionnel]({{ site.url }}/results.html) que je suis passé de l’autre côté de l’écran, dévorant le bitume d’une nouvelle région chaque semaine. Mais pris dans l'action, j’avalais ces paysages de carte postale sans en profiter.

Aujourd’hui, je ralentis. À pied, en courant ou en roulant, vous pouvez me croiser avec ma famille sur les sentiers. Nous explorons l'Europe au rythme des vacances lors de nos voyages en van. Ces moments privilégiés nous rapprochent de la nature, nourrissent le goût de l'aventure et transforment notre quotidien.

Ici, je [partage]({{ site.url }}/follow.html) nos récits de voyages a travers l’objectif de mon Fujifilm x70, mes projets et réflexions sur le numérique, mes retours d’expérience sur le sport et la vie simple.

- 📍 Pontivy, Bretagne
- 🌱 Minimalisme
- ⛰️ Aventure, Endurance & Discipline

<h2 id="posts">Posts</h2>

Découvrez mes dernières publications:

<ul>
  {% for post in site.posts limit: 3 %}
  <li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%Y" }})</li>
  {% endfor %}
</ul>

<a href="{{ site.url }}/posts.html">Consulter toutes mes archives</a>
