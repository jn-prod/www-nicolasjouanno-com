---
layout: project
title: "Gael Le Bellec - Création d'une page web athlète"
seo_description: "Gestion du projet de création du mini site de Gael Le Bellec. Développement front-end javascript et intégration avec jekyll."
permalink: "/portfolio/project/gael-le-bellec.html"
img: "/assets/public/images/projets/ext-4.png"
context: >-
  Lorsque Gael m'a contacté en septembre 2017, il n'avais pas de présence en ligne. Comme pour tout athlète de haut niveau, ses
  supporteurs veulent connaître l'avancement de sa saison de façon centralisée. C'est ce rôle que tiendra désormais son site internet. 
job: "Freelance"
year: "2017"
type: 
  name: "Mini site"
  url: "site-vitrine.html"
link:
  url: "https://www.gael-lebellec.bzh"
  name: "gael-lebellec.bzh"
  
---
<!--1. Scope et contraintes-->
## Scope et contraintes

Sur le projet Gael m'a laissé l'ownership du design et de la partie tech.

Il souhaitait que le site soit multilingue, qu'il affiche dynamiquement des news, son calendrier des épreives à venir et ses classements.

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
