---
layout: post
title: "J'ai tué mon SaaS. Je l'ai reconstruit en skill."
description: "Le SaaSpocalypse vu d'un dev frontend : ce qui meurt quand l'IA arrive, ce qui survit, et le concept de frontend IA-native. Le cas concret de feezify, mon vieux carnet d'entraînement, reconstruit en une skill + un cœur markdown, zéro infra."
tags:
  - ia
  - systèmes agentiques
  - frontend
  - création
categories:
  - Tech & IA
published: false
---

On commence à appeler ça le SaaSpocalypse.

L'idée est simple : pendant quinze ans, on a vendu du logiciel au siège et à l'abonnement. Une app par problème, un serveur, une base, un compte, un paiement mensuel. L'IA est en train de faire fondre ce modèle. Quand un agent peut tenir la logique d'une petite app dans une conversation, 90 % de ce que tu payais — la plomberie — n'a plus de raison d'exister.

Je ne le regarde pas en analyste. Je le regarde en dev frontend. Et je viens de le faire sur un de mes vieux projets.

## J'avais un SaaS. Il s'appelait feezify.

C'était un carnet d'entraînement. Node, Express, Mongo, des comptes, un serveur, des déploiements. Je l'avais construit quand j'étais encore dans le sport, pour une raison précise : croiser deux choses que les outils ne croisent jamais bien — la **charge objective** (ce que disent les chiffres) et le **ressenti subjectif** (ce que dit le corps).

Il est mort. Pas d'un échec : de maintenance. Une app hébergée qu'on n'entretient plus s'éteint toute seule.

En le rouvrant des années plus tard, le constat m'a sauté aux yeux : **~90 % du code était de la tuyauterie.** L'authentification, la base, le serveur, la synchro Strava, l'interface. Tout ça, aujourd'hui, un agent et quelques connecteurs le font sans moi.

Ce qui restait — la seule chose qui valait quelque chose — c'était une **méthode**. Une façon de lire une journée : la forme d'un côté, le ressenti de l'autre, et un jugement quand les deux divergent. *Le subjectif arbitre l'objectif.* Des jambes fraîches ne passent jamais avant un corps qui dit non.

Cette méthode n'était écrite nulle part. Elle vivait dans ma tête et, à moitié, dans le code. C'était l'actif. Le reste, c'était de la location.

## Le frontend IA-native

Voilà le concept qui m'a débloqué, et il vient de mon métier.

En frontend, on a appris à séparer les couches : la **vue** qui rend, l'**état** qui porte les données, l'**interaction** qui écoute, le **backend** qui calcule et persiste, loin, derrière une API.

Une app IA-native, c'est le même découpage — mais déplacé :

- L'**IA est la couche de rendu.** Ce n'est plus React qui rend une vue, c'est le modèle qui rend une réponse.
- La **skill est le composant.** Un bout réutilisable qui sait faire *une* chose, avec ses règles, qu'on installe et qu'on compose.
- Le **markdown est l'état et les props.** Les données que le composant lit ne sont pas dans une base : ce sont des fichiers que tu possèdes.
- La **conversation est l'interaction.** Les events, c'est ce que tu dis.
- Et le **backend a disparu.** Plus de serveur, plus de compte, plus de télémétrie. Tout tourne en local, sur *ton* IA.

C'est un frontend sans backend. L'utilisateur n'ouvre pas mon app : il installe mon composant sur sa propre IA.

## Ce que feezify est devenu

J'ai gardé le nom et la méthode. J'ai jeté tout le reste.

feezify est maintenant **une skill + un cœur markdown portable.** Tu l'installes sur ton IA (Claude, ou un agent self-hosted comme OpenClaw), tu lui pointes un dossier de markdown qui t'appartient, et tu lui demandes comment tu vas aujourd'hui. Zéro infra.

Quelques décisions de design, en dev :

- **Architecture hexagonale.** Au centre, un domaine *pur* : le calcul de charge et la règle de croisement. Aucune entrée/sortie, aucun nom de provider. C'est le wedge, et c'est la seule partie vraiment testée. Autour, des **adaptateurs** interchangeables — Strava n'est qu'un fournisseur parmi d'autres, pas un chemin câblé. Ajouter une surface (une skill Claude, une skill OpenClaw) coûte presque rien : même moteur, manifeste différent.
- **Deux mémoires.** Ton **journal**, que *tu* écris (le brut, immuable). Et la **mémoire du coach**, que l'IA compile et maintient pour elle-même — le pattern « LLM Wiki » d'Andrej Karpathy : *arrête de re-dériver, commence à compiler.* Avec le temps, l'IA cesse de relire des mois de journal et lit ce qu'elle a déjà appris de toi, chaque affirmation tracée jusqu'à un jour précis.
- **Un copilote, pas un coach.** Il lit, il éclaire, il pose une couleur sur la journée et explique pourquoi. **C'est toi qui décides.** Il ne prescrit pas de séance. Cette ligne n'est pas un détail : c'est une règle de conception.

Et — c'est le point qui compte — **la méthode est ouverte.** Le dépôt est public, sous licence permissive. Le moat n'est pas le code : c'est la méthode, la voix, la distribution. Autant la mettre à découvert.

## Pourquoi je raconte ça

Parce que c'est, je crois, le mouvement de fond : on arrête de construire des apps, on construit des **composants pour les agents des gens.** Et que la meilleure façon de comprendre une techno, c'est de la montrer par le vécu — ici, un vieux projet à moi, ressuscité autrement.

Si tu lis tes propres données d'entraînement, feezify arrive en beta : la page — avec la liste d'attente pour l'avant-première — est **[ici](/feezify.html)**.

Et si tu construis des choses avec des agents, le dépôt est ouvert : **[github.com/jn-prod/feezify](https://github.com/jn-prod/feezify)**. La méthode est dedans, en clair.

*(Brouillon — version de travail. Liens finalisés à la publication.)*
