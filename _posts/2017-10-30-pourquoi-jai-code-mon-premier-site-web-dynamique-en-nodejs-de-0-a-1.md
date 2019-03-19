---
layout: post
title: Pourquoi j’ai codé mon premier site web dynamique en NodeJS, de A à Z.
date: 2017-10-30 06:01:00.000000000 +01:00
type: post
image: assets/public/images/posts/d5fc1-15p2d6fclh0dt9hc4wri4hw.jpeg

categories:
- Digital
- Personal-growth
- Experience
- Coulisses

tags:
- Web Development
- Learning
- Programming
- Startup

author: nicolas
---
<em>Si je m’amuse du développement front-end d’un site internet, mixant : HTML, CSS et JavaScript, me lancer dans le développement back-end fait naître chez moi d’avantage de questions, de l’apprentissage de langages à la gestion de bases données en passant par l’utilisation de framework.</em>
<hr />

Vous avez peu être déjà lu mon article :

- <a href="/pourquoi-jai-appris-a-coder-mon-mvp.html" target="_blank" rel="nofollow"><strong>Pourquoi j’ai appris à coder mon MVP ?</strong></a>

Dans la même logique, je continue de prendre de l’autonomie sur mes projets web. Mon but avoir la main à 100% sur la roadmap et maîtriser son développement.

Si l’on faquer le coté dynamique d’un site web statique avec des requettes ajax sur des documents JSON et des API. Ce fonctionnement ne peut fonctionner qu’avec un petit volume de donnée puisque les opérations sont réalisées dans le navigateur.

La question de réaliser des opérations coté serveur peu vite se poser pour améliorer la rapidité de réponse de sa webapp et l’expérience de son utilisateur. Mais aussi pour des projets nécessitant une structure transactionnelle (ex: ecommerce, marketplace).

Seulement voilà, au moment ou je me pose la question, je ne sais pas coder coté serveur. Je connais le javascript coté navigateur. J’entends parler de Ruby et son framework Ruby On rails avec un ami développeur. Je lit beaucoup de Python et son framework Django est assez accessible. Que PHP est omniprésent dans les CMS, comme wordpress que j’ai déjà utilisé sans coder.

J’ai fait le choix de rester sur un langage que je connaissais : le JavaScript, pour écrire rapidement les premières lignes de code, avoir mes premier succès pour garder la motivation et éviter une gymnastique de langage front-end / back-end.
<hr />


## NodeJS: npm install
<figure class="wp-caption"><img src="{{ site.siteurl }}/{{ site.imgpost }}/74ddb-1utch2gz4b5xfvt2dxhgnvq2x.jpeg" />
<figcaption class="wp-caption-text">Node JS</figcaption>
</figure>

Le JavaScript avec sa surcouche NodeJS coté serveur, présente avantages qui en fond une librairie de premier et non par défault:

- Il est asynchrone, ce qui le rend plus véloce.
- Il gère nativement le http/https, qui facilite la configuration des urls.
- Il est performant, en scallant lors du déploiement.
- Il facilite l’utilisation et la création d’API REST.
- Il est facilement utilisable pour crawler et scrapper des sites.

Pris de passion pour ce nouveau challenge, je structure ma liste connaissances coté serveur nécessaire pour maîtriser la logique de bases. J’écume les ressources disponibles, apprends, me forme et surtout applique grâce à ce projet! Ce choix m’aura permis d’atteindre mon premier objectif: écrire rapidement les premières lignes de code et de sortir une version bêta en 2 mois.

Grâce à la bibliothèque disponible pour NodeJS: NPM, j’ai pu intégrer et gérer rapidement sans programmation complexe:

- la création de compte utilisateur,
- la gestion des droits d’accès,
- le hashage de mot de passe,
- la redirection https,
- les notifications par e-mails …

Les packages disponibles sous NodeJS ont été d’une grande utilité et leur documentation suffisamment accessible et étayée pour en simplifier l’intégration. L‘incontournable reste, selon moi, le choix du package de templating. J’ai opté pour «handlebars», s’il n’est pas le moins verbeux, le fait qu’il reprenne la structure HTML m’a permis de l’utiliser rapidement. Pour stabiliser l’app et gérer les erreurs (non pris en charge nativement par NodeJS), j’utilise le package PM2. Bluebird est très pratique pour gérer les promise et rendre synchrone les taches asynchrones sans callback hell.
<hr />


## MongoDB la base de donnée NoSQL
<figure class="wp-caption"><img src="{{ site.siteurl }}/{{ site.imgpost }}/16e54-1ta4qkthto-rmupnr08mbg.jpeg" />
<figcaption class="wp-caption-text">MongoDB</figcaption>
</figure>

L’autre point essentiel, qui est au centre de la structure, était le choix de la base de données. Partant sur un projet avec un cahier des charges très peu défini et peu garni, j’ai opté pour une base de données NoSQL mongoDB. Cela avait deux avantages:

- La base mongoDB noSQL permet de faire évoluer plus facilement la structure de la base de données,
- Le requête dans nodeJS se font sous forme d’objets JavaScript.
- Facilement implémentable dans NodeJS avec le package mongoose
<hr />

## Ce n’est que le début du chemin

Pour toutes ces raisons, rester sur un environnement JavaScript côté serveur me permet de poser les bases des futurs projets avec une solution relativement simple, rassurante et efficace.

Pour aller plus loin et continuer de développer ma stack technique je m’intéresse désormais à Redis et à la façon de le mixer avec MongoDB pour gagner en temps de clacul coté BDD. VueJS et ReactJS m’intéresse pour gérer les vue conditionnelles du front. Ruby On Rails et Python Django reste deux framework qui m’intéressent aussi fortement pour leur accessibilité reconnue.

Impossible de tout apprendre d’un coup. Donc je préfère avancer de façon pragmatique, selon mes besoins, pour pratiquer. Je trouve que c’est comme cela qu’on apprend le plus vite : analyser les problèmes, idéaliser une solution, tester, analyser …