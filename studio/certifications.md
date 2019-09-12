---
layout: expertises
title: "Certifications en Developpement web"
summary: "La programmation est un vaste domaine en constante évolution, plusieurs organismes proposent des formations en ligne (e-Learning) qui permettent d’obtenir des certifications sur leurs outils ainsi que sur des compétences techniques"
permalink: "/certifications.html"
header-img: "inspiration-1"
footer_cta: "Vous avez un projet digital pour votre startup, PME ou activité de freelance ? Et si nous en parlions ensemble pour vous aider à atteindre vos objectifs."
---
*Je réalise régulièrement des certifications afin de valider mes compétences en Digital et plus particulèrement en Développement web. Ce qui me permet d'accompagner au mieux mes clients sur leurs problèmatiques digital.*

*Je vous présente mes différentes certifications, que vous retrouverez également sur mon profil <a href="{{ site.data.authors.nicolas.linkedin }}" rel="me" target="blank">LinkedIn</a>.*


## Certifications OpenClassrooms
{: .my-5}

OpenClassrooms (ex- Site Du Zero) est une école française en ligne offrant des parcours diplômants et professionnalisants à plus de trois millions d'étudiants chaque mois à travers le monde. Elle est spécialisé dans les domaines du développement, du numérique et de la culture digitale. C'est établissement enregistré à l'academy de Paris propose précisément les compétences demandées par les entreprises d'aujourd’hui. Les certifications s'obtiennent après la validation de QCM et de travaux pratiques qui sont notés.


**Voici mes {{ site.data.certifications.size }} certifications :**

{% for certification in site.data.certifications %}
  - <span class="text-muted">{{ certification.category }} -</span> {% if certification.url %}<a href="{{certification.url}}">{{certification.title}}</a> {% else %} {{certification.title}} {% endif %} \| <a href="{{site.data.authors.nicolas.certifications_folder}}">Mon certificat →</a>
{% endfor %}
