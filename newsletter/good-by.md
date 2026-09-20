---
layout: page
title: Me suivre autrement
description: Vous préférez ne plus recevoir mes publications par e-mail ? Retrouvez-moi sur Instagram, Threads, X ou YouTube.
redirect_from: /suivre-autrement/
sitemap: false
permalink: /newsletter/good-by/
robots: noindex, follow
---

# Me suivre autrement

Vous ne souhaitez plus recevoir mes publications par e-mail ? Aucun problème. Le lien de désinscription reste disponible dans l’e-mail que vous venez de recevoir.

Si vous préférez suivre à votre rythme, je publie aussi sur Instagram pour les images et les formats courts, sur Threads et X pour les observations et les échanges, et sur YouTube pour les récits et les démonstrations plus longs.

{% assign follow_campaign = '?utm_source=nicolasjouanno-com&utm_medium=page&utm_campaign=suivre-autrement' %}
{% assign instagram_url = site.author.instagram | split: '?' | first | append: follow_campaign | append: '&utm_content=instagram' %}
{% assign threads_url = site.author.threads | split: '?' | first | append: follow_campaign | append: '&utm_content=threads' %}
{% assign x_url = site.author.twitter | split: '?' | first | append: follow_campaign | append: '&utm_content=x' %}
{% assign youtube_url = site.author.youtube | split: '?' | first | append: follow_campaign | append: '&utm_content=youtube' %}

<div class="u-text--center u-spacing--block-start-large u-spacing--block-end-large">
  <ul class="c-button-stack c-button-stack--center u-list">
    <li>
      {% include components/social-link.html icon="instagram" url=instagram_url label="Suivre Nicolas Jouanno sur Instagram" %}
    </li>
    <li>
      {% include components/social-link.html icon="threads" url=threads_url label="Suivre Nicolas Jouanno sur Threads" %}
    </li>
    <li>
      {% include components/social-link.html icon="x" url=x_url label="Suivre Nicolas Jouanno sur X" %}
    </li>
    <li>
      {% include components/social-link.html icon="youtube" url=youtube_url label="Suivre Nicolas Jouanno sur YouTube" %}
    </li>
  </ul>
</div>

Vous pouvez aussi continuer à lire librement mes archives sur ce site. Le désabonnement ne change rien à leur accès, ni à celui des outils que je construis.
