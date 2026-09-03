---
layout: page
title: Articles
description: "Toutes mes publications autour du VTT, du trail et du sans gluten."
permalink: "/posts.html"
---

# Articles

<div id="post-filters" class="u-flex u-flex--tight u-spacing--block-end-medium" role="group" aria-label="Filtrer par thème">
  <button type="button" class="c-button c-button--dark" data-filter="all" aria-pressed="true">Tous</button>
  {%- for v in site.data.taxonomie.verticales -%}
    {%- if v.visible_footer -%}
      <button type="button" class="c-button c-button--dark-outline" data-filter="{{ v.slug }}" aria-pressed="false">{{ v.label }}</button>
    {%- endif -%}
  {%- endfor -%}
</div>

<ul class="u-list c-section__post-list" id="all-posts">
  {%- for post in site.posts -%}
    {%- unless post.archive -%}
      <li class="c-section__post-item" data-category="{{ post.verticale }}">{%- include /components/post.html -%}</li>
    {%- endunless -%}
  {%- endfor -%}
</ul>

<p class="u-spacing--block-start-medium"><a href="/archive.html">Voir l'archive (7) →</a></p>
