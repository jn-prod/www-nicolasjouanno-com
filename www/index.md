---
title: "Nicolas Jouanno — VTT, trail, sans gluten et van en famille"
layout: page
description: "Ex-cycliste professionnel, je partage le VTT, le trail, le sans gluten et nos voyages en van en famille, avec plus de vingt ans de projets sur le web."
permalink: /index.html
breadcrumb_hide: true
---

<hgroup class="u-text--center">
  <h1><span class="u-visually-hidden">{{ site.title }}. </span>VTT, trail, sans gluten et van en famille.</h1>
  <p>Ex-cycliste professionnel, je partage ce que je vis, ce que j'apprends et ce que je construis en chemin.</p>
</hgroup>

<p class="u-text--center"><img class="c-avatar c-avatar--xlarge" src="/images/nicolas-jouanno.webp" alt="Portrait de Nicolas Jouanno" width="256" height="256" /></p>

Le vélo a d'abord donné le rythme. J'ai été [cycliste professionnel]({{ site.url }}/me/results.html?utm_source=home&utm_medium=proof&utm_campaign=ecosystem) chez Bretagne Schuller et j'ai pris part à cinq championnats de France, avant qu'une blessure ne m'oblige à arrêter.

Aujourd'hui, je roule et je cours autrement. Avec ma famille, nous parcourons l'Europe en van au rythme des vacances, avec les vélos, les chaussures de trail et la contrainte du sans gluten dans nos bagages.

Je crée et publie sur le web depuis plus de vingt ans. Je ne l'ai jamais fait selon une cadence régulière : j'y reviens quand une expérience mérite d'être partagée ou qu'un problème vécu appelle une réponse concrète. C'est ce fil qui relie des sujets qui pourraient sembler éloignés.

<p><a href="/me/?utm_source=home&utm_medium=proof&utm_campaign=ecosystem" class="c-button c-button--dark-outline">Mon parcours →</a></p>

## 🚵 VTT & trail

Le vélo reste mon premier langage. [vtt.bzh]({{ site.projects.vtt_bzh.url }}) est né en 2013 d'une question très simple : où rouler dimanche ? [feezify](/feezify.html) prolonge une autre part de cette histoire, mon carnet d'entraînement, pour mieux comprendre la charge et le ressenti. Le trail est arrivé après le vélo, avec le plaisir de recommencer comme débutant.

<p class="c-button-stack">
  <a href="/vtt/" class="c-button c-button--dark-outline">VTT →</a>
  <a href="/trail/" class="c-button c-button--dark-outline">Trail →</a>
</p>

## 🌱 Sans gluten

La maladie cœliaque est entrée dans notre vie familiale et a changé des gestes aussi ordinaires que faire les courses, cuisiner ou choisir un restaurant. Le [quiz « Gluten ou pas gluten ? »](/apps/gluten-not-gluten/) est né pour rendre cette vigilance visible et plus facile à partager.

<p><a href="/nutrition/sans-gluten.html" class="c-button c-button--dark-outline">Sans gluten →</a></p>

## 🇪🇺 Van en famille

Le van est le décor qui rassemble le reste : parcourir l'Europe en famille, trouver où rouler ou courir, et réussir à manger sans gluten loin de ses repères. Il donne à ces sujets un même terrain plutôt qu'une ligne éditoriale artificielle.

## En ce moment

<ul class="u-list">
  {% assign public_posts = site.posts | where_exp: "post", "post.archive != true" %}
  {% assign shown_count = 0 %}
  {% for post in public_posts %}
    {% unless post.categories contains "Work" %}
      <li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%Y" }})</li>
      {% assign shown_count = shown_count | plus: 1 %}
      {% if shown_count == 3 %}{% break %}{% endif %}
    {% endunless %}
  {% endfor %}
</ul>

<p><a href="/posts.html" class="c-button c-button--dark-outline">Voir toutes les publications →</a></p>
