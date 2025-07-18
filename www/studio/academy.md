---
redirect_from: "/lessons/"
layout: page
title: L'academy du product management
summary: "Créer et piloter votre projet digital n'aura plus de secret. Mes cours sont conçus à partir de mes expériences professionneles. Ils s'orientent autour de la gestion de projet web, du growth hacking et du design."
permalink: "/academy.html"
bg: inspiration-1
---

# Apprenez à diriger votre projet digital.

## Créer et piloter votre stratégie produit n'aura plus de secret. Voici de précieuses ressources pour commencer.

<div class="row border-bottom border-muted bg-white sticky-top">
  <div class="col text-center">
    <a href="#books" class="btn btn-outline-primary my-2">Les livres</a>
    <a href="#podcasts" class="btn btn-outline-primary my-2">Les podcasts</a>
    <a href="#courses" class="btn btn-outline-primary my-2">Les cours</a>
    <a href="#lessons" class="btn btn-outline-primary my-2">Les leçons</a>
  </div>
</div>

<div class="container mb-5">

  <!-- books -->
  <div class="row my-5" id="books">

    <div class="col-12">

      <h2>Les Livres <a href="#mentions">*</a></h2>

    </div>

  </div>

  <div class="row my-5">

    {% for book in site.data.books %}

      <div class="col-md-3 mx-auto text-center">

        <div class="d-block text-capitalize font-weight-bold text-primary pb-3">{{ book.name }}</div>

        <div class="d-block">

          {{ book.link }}

        </div>

      </div>

    {% endfor %}

  </div>

  <!-- podcasts -->
  <div class="row my-5 pt-3" id="podcasts">

    <div class="col-12">

      <h2>Les podcasts</h2>

    </div>

  </div>

  <div class="row my-5 ">

    {% for podcast in site.data.podcasts %}

      <div class="col-md-3 text-center mx-auto px-3 pb-3">

        <a href="{{ podcast.url }}" target="_blank">

          <div class="font-weight-bold d-block mb-2">

            {{ podcast.name }}

          </div>

          <img src="{{ podcast.img }}" alt="{{ podcast.name }}" class="img-fluid">

        </a>

      </div>

    {% endfor %}

  </div>

  <!-- courses -->
  <div class="row my-5 pt-3" id="courses">

    <div class="col-12">

      <h2>Les cours</h2>

    </div>

  </div>

{% for course in site.data.courses limit: 3 %}

    <a href="{{ site.data.config.url }}{{course.url}}">

      <div class="row my-5 shadow border border-muted p-5 rounded">

        <div class="col-md-12">

          <div class="d-block">

            <h2 class="d-inline-block">

              {{ course.name }}

            </h2>

            {% if course.disponibility %}

              <span class="d-inline-block ml-3 font-weight-bold text-muted">{{ course.disponibility }}</span>

            {% endif %}

          </div>

          <p class="text-dark d-block">{{ course.summary }}</p>

          <span class="d-block">

            {% if course.price == "free" %}

              <span class="text-muted">Gratuit:</span> <span class="icon icon--check text-success ml-2"></span>

            {% else %}

              <span class="text-primary font-weight-bold">{{ course.price }}

            {% endif %}

          </span>

        </div>

      </div>

    </a>

{% endfor %}

</div>

<div class="container">
  <div class="row">
    <div class="col-12 my-5">
      <small class="d-block text-muted" id="mentions">* Cette rubrique peut contenir des liens faisant partie d'un programme d'affiliation amazon.fr.</small>
    </div>
  </div>
</div>
