---
redirect_from: 
  - "/edito.html"
  - "/studio.html"
  - "/devis.html"
  - "/portfolio.html"
layout: page
title: Découvrir mon histoire et mes projets
summary: "Développeur frontend et créateur d'interfaces qui plaisent a vos utilisateurs."
permalink: "/about.html"
---

# Je développe des interfaces accessibles pour vos utilisateurs.

<!-- technologies -->
<ul class="c-icons-list">
  {% for technologie in site.data.technologies limit:10 %} {% if
  technologie.profile == true %}

  <li class="c-icons-list__element">
    <i class="{{technologie.icon}} icon--x3 "></i>
  </li>

  {% endif %} {% endfor %}
</ul>

## Je suis un developpeur front-end qui donne vie à vos idées. J'aime garder les choses simples et procurer une expérience propre et fonctionnelle à vos utilisateurs.

Je suis <a href="/">développeur front-end</a>, je co-conçois des <a href="/offres/site-applicatif.html">sites web applicatif et applications mobile</a> avec votre équipe produit. Je suis aussi l'homme derrière <a href="https://vtt.bzh">vtt.bzh</a>, une application web pour trouver une nouvelle randonnée chaque week-end en Bretagne. 

Ma trajectoire professionnel s'inscrit dans le domaine sportif. Après une carrière de <a href="/results.html">cycliste professionnel</a>, je deviens Responsable Communication et Webmaster chez Twinner Sport. J'ai créé et dévelopé mon entreprise de vente d'article de sport outdoor cross-canal. Puis je suis devenu <a href="/chef-projet-digital.html">Chef de Projet Digital Full Stack</a> pour un groupement, dans lequel j'ai développé une plate-forme d'inscription en ligne <a href="/portfolio/project/event-izir.html"></a>event.izir.fr</a> et un portail intranet pour piloter la stratégie commerciale du groupe.

Maintenant, je suis développeur full-stack JS (NodeJS, MongoDB, AngularJS & VueJS) chez MGDIS. Une entreprise Bretonne qui aide les collectivités à gérer les aides publiques. Passioné par les interfaces réussitent, j'aime échanger sur cette thématique avec les autres memblre de la guilde UX/UI de l'entreprise. Curieux, je continue de me former et de m'informer sur les nouvelles technologies, frameworks et relève le defis des <a href="{{ site.data.config.url }}/certifications.html">certifications</a>.

Je partage ma veille et parle de sport, mobilité, productivité, minimalsime et d'environnement sous le pseudo <a href="{{ site.data.authors.nicolas.linkedin }}">{{ site.data.authors.nicolas.handle }}</a> sur Linkedin.

J'aime pratiquer les best practices des plus grandes entreprises tech, comme Lean Startup, le Design Thinking, la méthode Agile & le Lean UX.

J'interviens sur tout le cycle de vie d'un produit numérique : de la création de POC (Proof Of Concept) à <a href="/expertises/developpeur-back-end.html">l'automatisation de taches</a> pour des besoins de Growth Marketing, en passant par l'incrémentation de nouvelles features à un produit ou MVP (Minimum Viable Product).

Je développe avec vous une web app scalable qui tient compte de vos objectifs de rétention, des contraintes métier et de vos utilisateurs.

Commençons par <a href="{{ site.data.authors.nicolas.linkedin }}">en parler</a> ensemble. Enfin, je partage mes connaissances techniques, stratégiques et opérationnelles sur <a href="{{ site.data.config.url }}/stories.html">le blog</a>.


## Vous accompagner à chaque étape de votre application web.

Vous développez une <a href="/offres/site-applicatif.html">application mobile</a> ou un <a href="/offres/site-vitrine.html">site internet</a> pour votre startup ? Vous avez besoin d'un professionnel pour développer votre produit ? Vous souhaitez créer votre MVP pour séduire de nouveaux utilisateurs et/ou investisseurs ? Découvrez comment je peux vous aider dans vos projets:

## Mes projets

{% for project in site.data.projects %}
  <article id="{{ project.name }}" class="u-grid">
    <div class="u-grid__col-6">
      <h3>
        <a href="{{ project.url }}">{{ project.name }}</a>
      </h3>
      <img
        src="{{ project.images[0] }}"
        alt="{{ project.name }}"
      />
    </div>
    <div class="u-grid__col-6">
      <p>{{ project.mission }}, {{ project.year }}</p>
      <ul>
        {% for expertise in project.expertises %}
          <li>{{ expertise }}</li>
        {% endfor %}
      </ul>
    </div>
  </article>
{% endfor %}   

## Me contacter.

Vous pouvez me contacter sur <a href="{{ site.data.authors.nicolas.linkedin }}">Linkedin</a>.