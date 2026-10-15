---
title: La Sortie — newsletter outdoor de Nicolas Jouanno
layout: page
description: Des chemins, des voix et des idées pour découvrir la Bretagne. La newsletter mensuelle de Nicolas Jouanno.
permalink: /index.html
---

<hgroup class="u-text--center">
  <h1>La Sortie</h1>
  <p>Des chemins, des voix et des idées pour découvrir la Bretagne.</p>
</hgroup>

{% include components/newsletter-form.html id="home" title="Recevoir La Sortie" %}

{% assign latest_issue_posts = site.posts | where_exp: "post", "post.tags contains 'la-sortie'" %}
{% assign latest_issue = latest_issue_posts | first %}
{% if latest_issue %}
## Dernière édition

{% for post in latest_issue_posts limit: 1 %}
  {% include components/post.html %}
{% endfor %}
{% endif %}

{% assign remaining_posts = site.posts | where_exp: "post", "post.url != latest_issue.url" %}
{% if remaining_posts.size > 0 %}
## Dernières publications

<ul class="u-list c-section__post-list">
  {% for post in remaining_posts limit: 4 %}
    <li class="c-section__post-item">{% include components/post.html post=post %}</li>
  {% endfor %}
</ul>

<p class="u-spacing--block-start-medium"><a href="/posts.html" class="c-button c-button--dark-outline">Voir toutes les publications</a></p>
{% endif %}

## Derrière La Sortie

<p class="u-text--center"><img class="c-avatar c-avatar--large" src="/images/nicolas-jouanno.jpg" alt="Portrait de Nicolas Jouanno" width="128" height="128" /></p>

Le vélo a d'abord donné le rythme. J'ai été [cycliste professionnel]({{ site.url }}/results.html?utm_source=home&utm_medium=proof&utm_campaign=ecosystem) chez Bretagne Schuller. Aujourd'hui, je roule et je cours autrement.

Je crée sur le web depuis plus de vingt ans.

<p><a href="/a-propos/" class="c-button c-button--dark-outline">À propos</a></p>

{% include components/social-links.html %}
