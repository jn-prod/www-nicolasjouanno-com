---
layout: page
title: Posts
description: "Tous mes articles : développement frontend, accessibilité, design system, voyages en van, photographie, sport et minimalisme numérique."
permalink: "/posts.html"
---

# Posts

<div class="c-filters" role="group" aria-label="Filtrer par domaine">
  <button type="button" data-filter="all" aria-pressed="true">Tous</button>
  <button type="button" data-filter="outdoor" aria-pressed="false">Outdoor</button>
  <button type="button" data-filter="life" aria-pressed="false">Life</button>
  <button type="button" data-filter="work" aria-pressed="false">Work</button>
</div>

<ul class="u-list c-section__post-list" id="all-posts">
  {%- for post in site.posts -%}
    {%- assign slugs = "" -%}
    {%- for c in post.categories -%}
      {%- assign cslug = c | slugify -%}
      {%- assign slugs = slugs | append: cslug | append: ' ' -%}
    {%- endfor -%}
    <li class="c-section__post-item" data-category="{{ slugs | strip }}">{%- include /components/post.html -%}</li>
  {%- endfor -%}
</ul>
