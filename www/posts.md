---
layout: page
title: Posts
description: "Tous mes articles, filtrables par format (récits, guides) et par thème (VTT, trail, nutrition, projets, life)."
permalink: "/posts.html"
---

# Posts

<div id="post-filters" class="u-flex u-flex--tight u-spacing--block-end-medium" role="group" aria-label="Filtrer par format ou par thème">
  <button type="button" class="c-button c-button--dark" data-filter="all" aria-pressed="true">Tous</button>
  <button type="button" class="c-button c-button--dark-outline" data-filter="recit" aria-pressed="false">Récits</button>
  <button type="button" class="c-button c-button--dark-outline" data-filter="guide" aria-pressed="false">Guides</button>
  {%- for v in site.data.taxonomie.verticales -%}
    {%- if v.visible_footer -%}
      <button type="button" class="c-button c-button--dark-outline" data-filter="{{ v.slug }}" aria-pressed="false">{{ v.label }}</button>
    {%- endif -%}
  {%- endfor -%}
</div>

<ul class="u-list c-section__post-list" id="all-posts">
  {%- for post in site.posts -%}
    {%- unless post.archive -%}
      <li class="c-section__post-item" data-category="{{ post.format }} {{ post.verticale }}">{%- include /components/post.html -%}</li>
    {%- endunless -%}
  {%- endfor -%}
</ul>

<p class="u-spacing--block-start-medium"><a href="/archive.html">Voir aussi l'archive des actualités datées (7) →</a></p>
