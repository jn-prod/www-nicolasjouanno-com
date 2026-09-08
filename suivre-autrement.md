---
layout: page
title: "Me suivre autrement"
description: "Vous préférez ne plus recevoir mes publications par e-mail ? Retrouvez-moi sur Instagram, Threads, X ou YouTube."
permalink: /suivre-autrement/
noindex: true
sitemap: false
breadcrumb_hide: true
hide_follow_cta: true
---

# Me suivre autrement

Vous ne souhaitez plus recevoir mes publications par e-mail ? Aucun problème. Le lien de désinscription de Substack reste disponible dans l’e-mail que vous venez de recevoir.

Si vous préférez suivre à votre rythme, je publie aussi sur Instagram pour les images et les formats courts, sur Threads et X pour les observations et les échanges, et sur YouTube pour les récits et les démonstrations plus longs.

{% assign follow_campaign = '?utm_source=nicolasjouanno-com&utm_medium=page&utm_campaign=suivre-autrement' %}

<div class="u-text--center u-spacing--block-start-large u-spacing--block-end-large">
  <ul class="c-button-stack c-button-stack--center u-list">
    <li>
      <a href="{{ site.author.instagram | split: '?' | first }}{{ follow_campaign }}&utm_content=instagram" class="c-button c-button--icon c-button--large" aria-label="Suivre Nicolas Jouanno sur Instagram" target="_blank" rel="noopener">
        <span class="c-icon">{% include icons/instagram.svg %}</span>
      </a>
    </li>
    <li>
      <a href="{{ site.author.threads | split: '?' | first }}{{ follow_campaign }}&utm_content=threads" class="c-button c-button--icon c-button--large" aria-label="Suivre Nicolas Jouanno sur Threads" target="_blank" rel="noopener">
        <span class="c-icon">{% include icons/threads.svg %}</span>
      </a>
    </li>
    <li>
      <a href="{{ site.author.twitter | split: '?' | first }}{{ follow_campaign }}&utm_content=x" class="c-button c-button--icon c-button--large" aria-label="Suivre Nicolas Jouanno sur X" target="_blank" rel="noopener">
        <span class="c-icon">{% include icons/x.svg %}</span>
      </a>
    </li>
    <li>
      <a href="{{ site.author.youtube | split: '?' | first }}{{ follow_campaign }}&utm_content=youtube" class="c-button c-button--icon c-button--large" aria-label="Suivre Nicolas Jouanno sur YouTube" target="_blank" rel="noopener">
        <span class="c-icon">{% include icons/youtube.svg %}</span>
      </a>
    </li>
  </ul>
</div>

Vous pouvez aussi continuer à lire librement mes archives sur ce site. Le désabonnement ne change rien à leur accès, ni à celui des outils que je construis.
