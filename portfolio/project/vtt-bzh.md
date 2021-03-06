---
layout: project
title: vtt.bzh - Refonte full-stack Python/AngularJS d'une web-app
seo_description: "Refonte full-stack de la web-app vtt.bzh, création d'un scraper python et développement front AngularJS."
permalink: "/portfolio/project/vtt-bzh.html"
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

Le [scraper NodeJS](https://github.com/jn-prod/api-vtt-bzh_archived) utilisait la librairie de test end-to-end "NightmareJS" un navigateur web haut niveau d'automatisation. Vous avez noté: haut-niveau, ça veut dire qu'il charge tout le contenu de la page et toutes ses fonctionnalités.

De fait, comme un internaute lambda sous chrome, le scraper attendait d'avoir une page chargée à 100% pour commencer son travail (allant donc de 5-15 secondes), le tout multiplié par une centaines de pages... Il faisait du bon travail, mais il était gourmand en ressources et en temps (une quinzaines de minutes).

Je choisis donc de challenger cette librairie.

### Utiliser le framework front-end VueJS
{: .font-secondary}

A a suite d'une longue veilles sur les frameworks front-end, incluant: [VueJS](https://vuejs.org/), [ReactJS](https://fr.reactjs.org/) et [Angular](https://angular.io/). C'est séduit par le design de VueJS que je choisi donc de migrer mon POC du javascript natif à une SPA (Single Page Application) VUE. *(une version non officelle a été également développée en AngularJS).*

Le résultat est sans appel, une application fluide, une navigation intuitive et un code maintenable grace a l'architecture composant.

<!--3. Solutions et choix technique-->
## D'une application full JS à une stack Python - VueJS

Après un peu de recherche éclairé par ma précédente veuille, je décide de réécrire tout le scrapper en [Python](https://www.python.org/) avec la librairie [scrapy](https://scrapy.org/) reconnu pour sa performance dans le domaine.

<!--4. Résultats et leçons-->
## Une app plus simple et plus rapide

Le premier gain se compte en ligne de code, la grosseur du scraper passant d'une dizaine de fichier d'une cinquantaine de ligne à un [fichier](https://github.com/jn-prod/vttbzh_scraper/blob/master/vttbzh_scraper/spiders/nafix.py) d'une cinquantaine de ligne. Ce qui en fait un outil mieux maintenable et plus évolutif.

Le deuxième gain est la vélocité du scraper, qui met désormais 1 à 2 minutes une fois lancé pour terminer son travail.

Enfin, refaire en VueJS le moteur de recherche en une journée était effectivement réaliste. Mais la logique composent correspondant mieux aux interactions en AngularJS, les points UX en attente ont, par la même occasion, été résolus.
