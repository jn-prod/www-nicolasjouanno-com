---
layout: page
title: Publications
description: "Toutes mes publications autour du VTT, du trail, du sans gluten, des voyages en van, du travail numérique et des outils que je construis."
permalink: "/posts.html"
---

# Publications

{% include components/post-list.html %}

{% assign archived_posts = site.posts | where: "archive", true %}
{% if archived_posts.size > 0 %}
<p class="u-spacing--block-start-medium"><a href="/archive.html">Voir l’archive ({{ archived_posts.size }})</a></p>
{% endif %}
