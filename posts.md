---
layout: page
title: Publications
description: "Toutes mes publications autour du VTT, du trail, du sans gluten, des voyages en van, du travail numérique et des outils que je construis."
permalink: "/posts.html"
---

# Publications

<nav aria-label="Explorer les publications par sujet" class="u-spacing--block-end-medium">
  <ul class="u-list c-button-stack">
    <li><a href="/outdoor/" class="c-button">Outdoor</a></li>
    <li><a href="/nutrition/sans-gluten.html" class="c-button">Sans gluten</a></li>
  </ul>
</nav>

{% include components/post-list.html %}

{% assign archived_posts = site.categories.archive %}
{% if archived_posts.size > 0 %}
<p class="u-spacing--block-start-medium"><a href="/archive.html">Voir l’archive ({{ archived_posts.size }})</a></p>
{% endif %}
