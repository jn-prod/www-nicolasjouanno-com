---
layout: page
title: Abonnements
description: Les blogs et newsletters que Nicolas Jouanno suit.
permalink: /blogroll/
robots: noindex
sitemap: false
---

# Abonnements

Les blogs et newsletters que je lis. C’est l’équivalent de mes abonnements sur un réseau social, sans fil d’actualité pour les trier.

<ul>
  {% for blog in site.data.blogroll %}
  <li><a href="{{ blog.url }}" rel="nofollow noopener" target="_blank">{{ blog.name }}</a>, {{ blog.author }}</li>
  {% endfor %}
</ul>
