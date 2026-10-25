---
layout: page
title: Où me suivre
description: "Les façons de suivre Nicolas Jouanno : La Sortie par e-mail, le flux RSS, Facebook, Instagram et Threads."
permalink: /hello/
---

# Où me suivre

Tout part de ce site. Choisissez comment en recevoir la suite : par e-mail une fois par mois, dans un lecteur de flux, ou sur les réseaux où je relaie mes publications.

{% assign follow_campaign = '?utm_source=nicolasjouanno-com&utm_medium=page&utm_campaign=hello' %}
{% assign facebook_url = site.author.facebook | split: '?' | first | append: follow_campaign | append: '&utm_content=facebook' %}
{% assign instagram_url = site.author.instagram | split: '?' | first | append: follow_campaign | append: '&utm_content=instagram' %}
{% assign threads_url = site.author.threads | split: '?' | first | append: follow_campaign | append: '&utm_content=threads' %}

## La Sortie

Une fois par mois, une photo, un vécu et ce qui mérite l’attention dehors.

<p><a class="c-button c-button--brand" href="/la-sortie/subscribe/">Recevoir La Sortie</a></p>

## Flux RSS

<p><a class="c-button c-button--dark-outline" href="/feed.xml">S’abonner au flux RSS</a></p>

## Réseaux sociaux

<div class="u-spacing--block-start-large u-spacing--block-end-large">
  <ul class="c-button-stack u-list">
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
