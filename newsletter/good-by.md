---
layout: page
title: Me suivre autrement
description: Vous préférez ne plus recevoir mes publications par e-mail ? Retrouvez-moi sur Facebook, Instagram ou Threads.
sitemap: false
permalink: /newsletter/good-by/
robots: noindex, follow
---

# Me suivre autrement

Vous ne souhaitez plus recevoir mes publications par e-mail ? Aucun problème. Le lien de désinscription reste disponible dans l’e-mail que vous venez de recevoir.

Si vous préférez suivre à votre rythme, je relaie mes publications sur Facebook, Instagram et Threads.

{% assign follow_campaign = '?utm_source=nicolasjouanno-com&utm_medium=page&utm_campaign=suivre-autrement' %}
{% assign facebook_url = site.author.facebook | split: '?' | first | append: follow_campaign | append: '&utm_content=facebook' %}
{% assign instagram_url = site.author.instagram | split: '?' | first | append: follow_campaign | append: '&utm_content=instagram' %}
{% assign threads_url = site.author.threads | split: '?' | first | append: follow_campaign | append: '&utm_content=threads' %}

<div class="u-text--center u-spacing--block-start-large u-spacing--block-end-large">
  <ul class="c-button-stack c-button-stack--center u-list">
    <li>
      {% include components/social-link.html icon="facebook" url=facebook_url label="Suivre Nicolas Jouanno sur Facebook" %}
    </li>
    <li>
      {% include components/social-link.html icon="instagram" url=instagram_url label="Suivre Nicolas Jouanno sur Instagram" %}
    </li>
    <li>
      {% include components/social-link.html icon="threads" url=threads_url label="Suivre Nicolas Jouanno sur Threads" %}
    </li>
  </ul>
</div>

Vous pouvez aussi continuer à lire librement mes archives sur ce site. Le désabonnement ne change rien à leur accès, ni à celui des outils que je construis.
