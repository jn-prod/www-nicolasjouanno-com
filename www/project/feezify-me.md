---
layout: project
title: "Feezify:me Création d'une web-app pour la gestion des entrainements"
seo_description: "Product management de la web-app Feezify:me. Développement full-stack NodeJS, MongodDB, ExpressJS."
permalink: "/portfolio/project/feezify-me.html"
img: "/images/projets/ext-3.png"
context: >-
  Au printemps 2018, je me remet à la course à pieds. C'est en parlant avec des amis qu'on exprime notre lassitude
  de copier/coller nos metrics clés enregistrées par nos smartphones et montres connectés sur Excel. Sans compter
  qu'ensuite il faut envoier le fichier par e-mail à son entraineur.
job: "Side Project"
year: "2018"
type: 
  name: "Web app"
  url: "site-applicatif.html"
link:
  url: "https://app.nicolasjouanno.com"
  name: "Feezify:me"
  
---
<!--1. Scope et contraintes-->
## Scope et contraintes

Seul sur le projet. Je profite des conseils d'un ami qui est entraineur sportif pour le choix de KPI pertinent, puis part à leur recherche sur le net.

Je gère donc ce projet de A à Z de la recherche utilisateurs au développement et le design de l'application, en dehors de mes heures de travail.

<!--2. Problème-->
## Problème

Je dois donc trouver le moyen de récuperer les données du sportif. Puis lui permettre partager les données d'entrainement avec son entraineur.

Le sportif à le choix des marques de montre et des applications pour enregistrer ses entrainement, il faudra choisir la plus large pour le MVP. Il faudra qu'elle mette à disposition gratuitement un API permettant de consulter les données du sportif.

L'objectif est d'avoir un outil simple et ludique pour mesurer ma fatigue physique et mentale, plannifier sa saison et suivre l'évolution de son planning de compétition et ses classements.

<!--3. Solutions et choix technique-->
## Solutions et choix technique

[Strava](https://www.strava.com/) permet de synchroniser ses données avec les principaux fabriquants de montre connectées pour la pratique sportive. C'est aussi l'application de premier choix pour les sportifs qui ont des objectifs de performance. En plus, Strava met à disposition une API qui permet de récupérer toures ses données une fois synchroniser avec son profil.

Le POC doit donc se connecter au profil Strava du sportif, y récupèrer ses metrics clef d'activités et les stocker dans une base de données [MongoDB](https://www.mongodb.com/fr). La base de données noSQL permettant d'avancer dans le brouillard sur sa structure.

Le sportif à ensuite accès à un espace utilisateur tournant sur un serveur [NodeJS](https://nodejs.org/en/) et peut configurer son compte pour que son entraineur accède directement à ses données d'activité.

<!--4. Résultats et leçons-->
## Résultats et leçons

Le POC atteind son objectif en toute transparence et simplicité pour l'utilisateur.

L'application prenant une forte orientation analytique et mathématique, le MVP gagnerait à être recoder en [Python](https://www.python.org/) pour profiter des librairies mathématique de ce langage comme [panda](https://pandas.pydata.org/), gagnerait en maintenabilité avec un paradigme objet et en productivité avec un syntaxe plus light.
