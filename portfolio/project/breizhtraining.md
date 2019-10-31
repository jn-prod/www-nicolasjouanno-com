---
layout: project
title: "breizhtraining.bzh - Création d'une page web entreprise"
seo_description: "Gestion du projet de création du mini site de breizhtraining. Développement front-end javascript et intégration avec jekyll."
permalink: "/portfolio/project/breizhtraining.html"
img: "/assets/public/images/projets/ext-4.png"
context: >-
  Gael, Grégoire et moi avont porté ensemble, chez les jeunes, le maillot de la sélection Bretonne de cyclisme. Lorsqu'ils m'ont parlé de leur nouveau projet et de leur besoin de visiblité en ligne, j'avais vraiment envie de les aider.
  Ils avaient besoin d'un site vitrine qui leur serve de carte de visite et de relai commercial. 
job: "Freelance"
year: "2019"
type: 
  name: "Mini site"
  url: "site-vitrine.html"
link:
  url: "https://www.breizhtraining.bzh"
  name: "breizhtraining.bzh"
  
---
<!--1. Scope et contraintes-->
## Scope et contraintes

Sur le projet Gael et Grégoire était déjà accompagné par un graphiste. Il a fallu adapter les éléments au contraintes de web-design. J'avais la pleine responsabilité de la partie tech.

Il souhaitait que le site soit moderne avec un slider full-screen, qu'il affiche dynamiquement les stages. Et plusieurs sections liées aux tarifs, présentations et prestations.

Enfin, il souhaitait avoir un accès simple pour la mise à jour de ces informations sans vouloir prendre du temps pour la mise en page. Le tout sans maintenance.

<!--2. Problème-->
## Problème

Un CMS et la création d'un site sur-mesure était over-kill sur son cahier des charges minimaliste par nature. L'objectif est donc de créer un site static avec l'appel [AJAX](https://developer.mozilla.org/fr/docs/Web/Guide/AJAX) à un fichier qu'il tien lui même à jour.

<!--3. Solutions et choix technique-->
## Solution

Je me suis donc orienté vers le générateur de site static [jekyll](https://jekyllrb.com/) qui me permet de gérer avec un skelette commun les versions anglaises et françaises, reposant sur une grille [bootstrap](https://getbootstrap.com/) responsive.

Le contenu dynamique provient d'un google sheet qu'il gère. Il est injecter en javascript natif au chargement de la page via l'API de google.

<!--4. Résultats et leçons-->
## Résultats et leçons

Cette stack remplis toutes les exigeance de simplicité d'usage pour lui, d'une maintenance quasi nulle à l'imgage des risques de piratage.
