---
layout: project
title: "Go Sport - Création d'un intranet pour le partage des tableaux de bord commerciaux"
seo_description: "Gestion du projet de création d'un intranet Go Sport. Développement full-stack NodeJS, MongodDB, ExpressJS."
permalink: "/portfolio/project/go-sport.html"
img: "/images/projets/ext-2.png"
context: >-
  Lors de mon arrivé en 2016 dans un groupement de 7 magasins GO Sport indépendant, l'une de mes tâches consistait à maintenir à jour un 
  fichier Excel. Le maintien de ce fichier Excel était d'une priorité absolu car servant de tableau de bord hébdomadaire et mensuel
  pour aider les responsables de magasin et acheteurs dans le pilotage du points de vente et des univers.
job: "Chargé de promotions (CDI)"
year: "2018"
type:
  name: "Web app"
  url: "site-applicatif.html"
link:
  url: "#"
  name: "Go Sport"
---

<!--1. Scope et contraintes-->

## Scope et contraintes

En charge de l'extraction de données de l'outil de GRC et de leur intégration dans le tableau de bord une matinée par semaine. Il n'est pas possible de se connecter directement à la base de données de l'outil de GRC.

<!--2. Problème-->

## Problème

Après deux ans, le fichier c'était complexifier et son maintient très compliqué par l'usage même d'Excel (formules cassées, répétées, complexe, ...) et par le volume de données traitées. L'objectif est donc d'avoir un outil qui comprend:

- les formules de performances commerciales dans un fichier,
- une base de données propre pour les séparer de l'application et profiter d'outils de requètes
- supprimer la répétition de ce qui correspondrait à des composants

<!--3. Solutions et choix technique-->

## Solutions et choix technique

La création d'un intranet permet de simplifier la communication avec des tableaux de bords mis à jours en temps reel, finis les erratum.
Création d'une application MVC en [NodeJS](https://nodejs.org/en/) - [MongoDB](https://www.mongodb.com/fr) - [ExpressJS](https://expressjs.com/fr/).

<!--4. Résultats et leçons-->

## Résultats et leçons

L'application permet de diminuer par 3 le temps de traitement et de façon exponentiel chaque modification. La création et la mise à jours de challenges, d'indice est simplifiées.
Cette application reposant sur des besoins mathématique gagnerait a tirer profit des librairies [Python](https://www.python.org/) et de son paradygme objet.
