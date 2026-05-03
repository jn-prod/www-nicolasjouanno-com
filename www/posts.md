---
layout: page
title: Posts
description: "Tous mes articles : développement frontend, accessibilité, design system, voyages en van, photographie, sport et minimalisme numérique."
permalink: "/posts.html"
---

# Posts

<ul class="c-section__post-list">
  {% for post in site.posts %}
  <li class="c-section__post-item">{% include /components/post.html %}</li>
  {% endfor %}
</ul>
