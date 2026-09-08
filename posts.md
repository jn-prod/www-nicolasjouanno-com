---
layout: page
title: Articles
description: "Toutes mes publications autour du VTT, du trail et du sans gluten."
permalink: "/posts.html"
---

# Articles

<ul class="u-list c-section__post-list">
  {%- for post in site.posts -%}
    {%- unless post.archive -%}
      <li class="c-section__post-item">{%- include /components/post.html -%}</li>
    {%- endunless -%}
  {%- endfor -%}
</ul>

<p class="u-spacing--block-start-medium"><a href="/archive.html">Voir l'archive (7) →</a></p>
