---
redirect_from:
  - "/portfolio/project/volt.html"
  - "/toolbox.html"
  - "/coaching.html"
  - "/cours.html"
  - "/cours/creer-site-web-sans-coder.html"
  - "/stories"
  - "/academy.html"
  - "/advertise/terms.html"
  - "/advertise.html"
  - "/categories/sport.html"
  - "/sitemap.html"
title: "Photographe de voyage en famille et van life | Développeur web et ancien cycliste professionnel"
layout: "page"
description: "Photographe de voyage en famille et développeur web. Je documente notre vie nomade en van à travers l'Europe : récits, conseils photo et réflexions sur un numérique plus humain."
permalink: "/index.html"
breadcrumb_hide: true
signature: true
---

<h1 id="about" class="u-visually-hidden">{{ site.title }}, {{ site.headline }}</h1>

<img class="u-image u-image-center u-image--large" src="/assets/icons/avatar.svg" alt="" />

👋 Moi c’est Nicolas. Depuis une vingtaine d’années, je [publie]({{ site.url }}/posts.html) et [développe des projets]({{ site.url }}/work.html) sur le web.

Ancien [cycliste professionnel]({{ site.url }}/results.html) et passionné de sports outdoor, je suis attentif à notre environnement et à l’impact qu’a le numérique sur celui-ci.

Je m’intéresse aux façons de rendre le web plus humain et plus durable.

Amateur de voyages, de photographie et de minimalisme. C’est depuis Pontivy en Bretagne, que je [partage]({{ site.url }}/follow.html) une vie simple sans algorithme ni intelligence artificielle.

<h2 id="posts">Posts</h2>

Voici une sélection de mes publications:

{% assign featured_posts = site.posts | where: "featured", "true" %}

<ul class="c-section__post-list c-section__post-list--compact">
  {% for post in featured_posts | limit: 3 %}
    {% if post.featured %}
    <li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%Y" }})</li>
    {% endif %}
  {% endfor %}
</ul>

<h3 id="newsletter" class="u-visually-hidden">📬 Newsletter</h3>

Les 3 articles ci-dessus sont en accès libre. Inscris-toi à la newsletter, pour lire l'intégralité de mes publications, (développement, cyclisme, productivité). Pas de spam, juste mes meilleures publications 1x/mois.

{% include /plugins/newsletter.html %}

<p><small><a href="{{ site.url }}/posts.html">Ou consulter toutes les archives</a></small></p>
