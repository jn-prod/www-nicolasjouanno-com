---
layout: page
title: Publications
description: "Les publications de nicolasjouanno.com depuis 2013 : guides VTT et récits, du vélo au web."
permalink: "/posts.html"
---

# Publications

<nav aria-label="Explorer les publications par sujet" class="u-spacing--block-end-medium">
  <ul class="u-list c-button-stack">
    <li><a href="/outdoor/" class="c-button">Outdoor</a></li>
  </ul>
</nav>

{% include components/post-list.html %}

{% assign archived_posts = site.categories.archive %}
{% if archived_posts.size > 0 %}
<p class="u-spacing--block-start-medium"><a href="/archive.html">Voir l’archive ({{ archived_posts.size }})</a></p>
{% endif %}
