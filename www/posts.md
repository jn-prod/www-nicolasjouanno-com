---
layout: page
title: Posts
permalink: "/posts.html"
---

# Posts

<ul class="c-section__post-list">
  {% for post in site.posts %}
  <li class="c-section__post-item">{% include /boxes/post.html %}</li>
  {% endfor %}
</ul>
