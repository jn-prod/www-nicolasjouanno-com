---
layout: project
title: "Event Izir - Création d'une plate-forme d'inscription pour les événements sportifs"
seo_description: "Gestion du projet de création de web-app Event Izir. Développement full-stack NodeJS, MongodDB, ExpressJS."
permalink: "/portfolio/project/event-izir.html"
img: "/assets/public/images/projets/ext-1.jpg"
context: >-
  Irir.fr est un site e-commerce créé en 2014 positionné sur les marchés du running, du vélo et de la randonnée.
  L'acquisition de clients de la plate-forme e-commerce se faisant par les comparateurs de prix, le besoin de
  performances du mix produit/prix était prioritaire. En recherche d'idées novatrices pour toucher ses pratiquants que
  l'on retrouve chaque week-end sur les événements régionnaux, l'idée d'une plate-forme d'inscriptions pour ces événements germa.
job: "Chef de Projet Full-stack (CDI)"
year: "2017 -  Aujourd'hui"
type: 
  name: "Web app"
  url: "site-applicatif.html"
link:
  url: "https://event.izir.fr/"
  name: "event.izir.fr"
  
---
<!--1. Scope et contraintes-->
## Scope et contraintes

En charge de la gestion de ce projet avec pour renfort un commercial, sans ligne de budget autre que mon temps, je devais prendre l'ownership des parties design, marketing et tech. Imaginé en juin 2017 et validé en aout 2017, nous avions trouvé la confiance d'un premier événement qui allait se dérouler en janvier 2018. Période que nous mettre au profit de ce POC (Proof of concept)

<!--2. Problème-->
## Problème et solutions technique

Event.izir.fr doit permettre aux sportifs de s'inscrire à des événements sportifs que les organisateurs auront au préalable créés sur la plate-forme.

Nous devions d'abord aller à la rencontre des organisateurs et chronométreurs pour élaborer un premier cahier des charges énumérant et priorisant leur besoins. A partir de là, nous connaissions les informations à récolter auprès des participants. 

Les inscriptions au événements étant sujet à des pic d'activité, je suis parti sur le PAAS [Heroku](https://www.heroku.com/) pour pouvoir géré plus facilement les montés en charge au besoin et garder des coups faibles le rest du temps.

L'élaboration du cahier des charges était rendu difficile par le manque de confiance des organisateurs pour une plate-forme qui n'a pas encore d'activité officiele. Difficile dès lors de pouvoir se présenter une base de données, je me suis donc orienté vers du noSQL avec [MongoDB](https://www.mongodb.com/fr).

De là en découle le choix de monter un serveur [NodeJS](https://nodejs.org/en/).

S'il m'était tentant de vouloir profiter de la puissance d'une stack [MEAN](http://meanjs.org/) ou MERN. Le fait de devoir gérer et produire l'intégralité de la stack projet m'a fait m'orienter sur une génération des vues côté serveur. C'est donc sur une architecture MVC monolitique de repose l'application.

<!--4. Résultats et leçons-->
## Résultats et leçons

Le MVP a vu le jour dans les temps et à repondu aux besoin de base des organisateurs.

L'évolution de la base de données restait magré tout un sujet sensible.

NodeJS, même enrichie d'ExpressJS, étant un outil brut j'ai passé beaucoup de temps à développer des outils qui sont embarqués sur des framework comme [Django](https://www.djangoproject.com/) ou [RoR](https://rubyonrails.org/).

Le tout sans pouvoir tirer profit d'une stack complète MEAN et du gain de temps long terme de l'usage de composant. Le fait de ne pas avoir pu mener de recherche utilisateurs poussée m'a aussi empêcher de tirer profit de la puissance de la POO.
