---
layout: project
title: vtt.bzh - Refonte full-stack Python/VueJS d'une web-app
seo_description: "Refonte full-stack de la web-app vtt.bzh, création d'un scraper python et développement front VueJS.
permalink: /portfolio/project/vtt-bzh.html
img: "/assets/public/images/projets/ext-6.png"
context: >-
  Créé en 2013, vtt.bzh a connu jusqu'à 10.000 visiteurs /mois. Le MVP que j'avais créé sous Wordpress était
  très "do things that don't scale". Je réalisais manuellement une curation des randonnées régionnales, que je listais
  manuelement sur le site. En 2016, je faisais mes premières armes en javascript et développa un scraper en
  NodeJS, lent, très lent ... Le scraper mettait à jour un fichier JSON intégrer en javascript natif sur le site.
  L'objectif était donc d'avoir un scraper plus rapide en back-end et de pouvoir mieux gérer le moteur de recherche en front-end.
job: "Side Project"
year: "2019"
type: 
  name: "Site applicatif"
  url: "site-applicatif.html"
link:
  url: "https://vtt.bzh"
  name: "vtt.bzh"
  
---
<!--1. Scope et contraintes-->
## Scope et contraintes
Vtt.bzh étant un side project, j'ai l'ownership de l'UX/UI et de l'ensemble de la stack technique.

J'ai également un temps limité.

Je dois donc garder les choses simples à construire et à maintenir.

<!--2. Problème-->
## Comment optimiser le scraper et maximiser l'usabilité du moteur de recherche ?

### Réécrire le scraper NodeJS en Python
{: .font-secondary}

Le (scraper NodeJS)[https://github.com/jn-prod/api-vtt-bzh_archived] utilisait la librairie de test end-to-end "NightmareJS" un navigateur web haut niveau d'automatisation. Vous avez noté: haut-niveau, ça veut dire qu'il charge tout le contenu de la page et toutes ses fonctionnalités.

De fait, comme un internaute lambda sous chrome, le scraper attendait d'avoir une page chargé à 100% pour commencer son travail (allant donc de 5-15 secondes), le tout multiplié par une centaines de pages... Il faisait du bon travail, mais il était gourmand en ressources et en temps (une quinzaines de minutes).

Je choisi donc de challenger cette librairie.

### Utiliser le framework front-end VueJS
{: .font-secondary}

Pour améloierer le moteur de recherche, il faut entrer dans un fichier javascript riche en fonction qui intéragissent entre elles.

Bien qu'il soit simple de comprendre le role de chacune d'elle comportement du moteur de recherche et son rendu procédural s'entremêle.

En séparant le code lié à la donnée du rendu, on assure le maintient des fonctionnalités de rendu et augemente les possibilités de filtre de la recherche.

Une séparation permise par les frameworks javascript moderne comme VueJS, ReactJS et Angular, favorisant l'ajout incrémental de feature.

Je choisi donc de passer du javascript natif à une structure SPA (Single Page Application).

<!--3. Solutions et choix technique-->
## D'une application full JS à une stack Python - VueJS

Après un peu de recherche éclairé par ma précédente veuille, je décide de réécrire tout le scrapper en Python avec la librairy (scrapy)[https://scrapy.org/] reconnu pour sa performance.

Séduit par la promesse de (VueJS)[https://vuejs.org/] d'être pris en main en une journée. C'est donc guider par mon objectif de temps que je m'oriente pour cette solution à un ReactJS ou AngularJS qui sont reconnus pour leur learning curve plus abrupte au debut.

<!--4. Résultats et leçons-->
## Une app plus simple et plus rapide

Le premier gain se compte en ligne de code, la grosseur du scraper passant d'une dizaine de fichier d'une cinquantaines de ligne à un (fichier)[https://github.com/jn-prod/www-vtt-bzh/blob/gh-pages/spider.py] d'une cinquantaine de ligne. Ce qui en fait un outil mieux maintenable et plus évolutif.

Le deuxième gain est la vélocité du scraper, qui met désormais 1 à 2 minutes une fois lancé pour terminer son travail.

Enfin, refaire en VueJS le moteur de recherche en une journée était effectivement réaliste. La logique composent correspondant mieux aux interactions, les points UX en attente ont par la même occasion été résolus.
