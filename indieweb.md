---
layout: page
title: IndieWeb
description: "Ce que l’IndieWeb change pour ce site, et un accès rapide aux pages qui en suivent les conventions."
permalink: /indieweb/
---

# IndieWeb

L’[IndieWeb](https://indieweb.org/IndieWeb) est une communauté de sites web indépendants et personnels. Elle part d’une idée simple : son propre site, sous son propre nom de domaine, reste le point d’ancrage de ce qu’on publie.

Ce site garde la forme d’un profil, celle que tout le monde sait lire. Dessous, il suit quelques conventions du mouvement.

## Ce que ça change ici

- **Je publie d’abord ici.** Les éditions de La Sortie sont publiées sur ce site, puis relayées sur Facebook, Instagram et Threads. C’est le principe [POSSE](https://indieweb.org/POSSE) : publier sur son propre site, diffuser ailleurs.
- **Le site déclare mes profils.** L’en-tête de chaque page relie mes profils avec l’attribut [`rel="me"`](https://indieweb.org/rel-me), qui indique que le lien désigne la même personne que la page.
- **Les machines lisent aussi le site.** L’accueil et la page À propos décrivent l’auteur avec un [h-card](https://microformats.org/wiki/h-card), et chaque article est balisé en [h-entry](https://microformats.org/wiki/h-entry). Un lecteur de flux ou un annuaire y retrouve le nom, la photo, le titre et la date sans deviner.

## Les pages

Leur nom reprend les « [slash pages](https://slashpages.net/) », ces pages placées à la racine d’un site (`/about`, `/now`, `/hello`, `/blogroll`…).

- [À propos](/about/) : qui je suis.
- [En ce moment](/now/) : ce qui m’occupe, daté et mis à jour quand ça change.
- [Où me suivre](/hello/) : La Sortie, le flux RSS, Facebook, Instagram et Threads.
- [Abonnements](/blogroll/) : les blogs que je suis. Cette page n’est pas indexée par les moteurs de recherche.
- [Flux RSS](/feed.xml) et [flux JSON](/feed.json) : les publications du site, pour un lecteur de flux.

## Ce que je n’ai pas mis en place

Je n’utilise pas [Webmention](https://indieweb.org/Webmention), le standard qui permet à des sites de se répondre entre eux, ni [IndieAuth](https://indieweb.org/IndieAuth), qui sert à se connecter avec son propre domaine.
