---
layout: post
title: "J'ai tué mon SaaS. Je l'ai reconstruit comme agent IA."
description: "Le SaaSpocalypse vu d'un dev frontend : ce qui meurt quand l'IA arrive, ce qui survit, et le concept d'app IA-native — le LLM comme nouvelle interface (après le navigateur), l'agent comme nouveau moteur métier, une mémoire en guise de base. Le cas concret de feezify, reconstruit en agent + cœur markdown, zéro infra."
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

L'idée est simple : pendant quinze ans, on a vendu du logiciel au siège et à l'abonnement. Une app par problème, un serveur, une base, un compte, un paiement mensuel. L'IA fait fondre ce modèle — littéralement : en février 2026, environ **285 milliards de dollars** se sont évaporés des valeurs SaaS en quarante-huit heures ([The SaaS CFO](https://www.thesaascfo.com/the-saaspocalypse-ai-agents-vibe-coding-and-the-changing-economics-of-saas/) ; [The Paypers](https://thepaypers.com/fintech/expert-views/the-saaspocalypse-and-payments-who-survives-when-the-per-seat-model-dies)). Le diagnostic du marché tient en une phrase : quand un agent fait le travail de dix personnes, on ne paie plus dix sièges.

Mais le krach n'est qu'un symptôme. La bascule de fond, c'est [Satya Nadella](https://officechai.com/stories/saas-applications-will-collapse-in-the-ai-agent-era-microsoft-ceo-satya-nadella/) qui la formule le plus clairement : les applis métier vont « s'effondrer », parce qu'au fond ce ne sont que des bases CRUD entourées de logique — et **cette logique migre dans la couche agent**. (Il n'a pas dit « le SaaS est mort » ; il a dit que la logique change d'étage. La nuance compte.)

Le récit complet de cette semaine où « l'IA a tué le logiciel » est bien raconté ici : [fintechbrainfood](https://www.fintechbrainfood.com/p/the-saaspocalypse). <!-- TODO avant publi : ajouter le lien du documentaire vidéo SaaSpocalypse validé par le fondateur -->

Je ne regarde pas ça en analyste. Je le regarde en dev frontend. Et je viens de le faire, à la main, sur un de mes vieux projets.

## J'avais un SaaS. Il s'appelait feezify.

C'était un carnet d'entraînement. Node, Express, Mongo, des comptes, un serveur, des déploiements. Je l'avais construit quand j'étais encore dans le sport, pour une raison précise : croiser deux choses que les outils ne croisent jamais bien — la **charge objective** (ce que disent les chiffres) et le **ressenti subjectif** (ce que dit le corps).

Il n'a pas échoué : il s'est éteint. Une app hébergée qu'on cesse d'entretenir finit par mourir toute seule.

En le rouvrant des années plus tard, le constat m'a sauté aux yeux : **~90 % du code était de la tuyauterie.** L'authentification, la base, le serveur, la synchro Strava, l'interface. Tout ça, aujourd'hui, un agent et quelques connecteurs le font sans moi.

Ce qui restait — la seule chose qui valait quelque chose — c'était une **méthode**. Une façon de lire une journée : la forme d'un côté, le ressenti de l'autre, et un jugement quand les deux divergent. *Le subjectif arbitre l'objectif.* Des jambes fraîches ne passent jamais avant un corps qui dit non.

Cette méthode n'était écrite nulle part. Elle vivait dans ma tête et, à moitié, dans le code. C'était l'actif. Le reste, c'était de la location.

## La solution : le navigateur, puis le LLM

Voilà le concept qui m'a débloqué.

Le navigateur web a été une rupture d'**interface**. Une fois qu'il s'est imposé comme *la* surface universelle, on a reconstruit toutes les applications pour lui : le web app est né de là. À chaque changement d'interface, on rebâtit le moteur applicatif pour elle.

Le chatbot IA est le nouveau navigateur. La surface par laquelle on accède à tout. Sauf qu'on ne *rebranche* pas l'ancienne app dessus : on rebâtit le moteur dans une nouvelle couche — **l'agent**. Et là, en dev, le découpage classique d'une app web se redéploie presque terme à terme :

| App web classique | Couche | App IA-native |
|---|---|---|
| Navigateur / frontend | l'**interface** | **le LLM / le chatbot** |
| Serveur / backend | le **moteur métier** | **l'agent** (archi hexagonale + adaptateurs vers les données) |
| Base de données | la **persistance** | **une mémoire** (log utilisateur + wiki d'agent) |

Trois idées, donc :

- **Le LLM est l'interface.** Plus de vue à rendre : le modèle rend une réponse, dans une conversation. Le frontend, c'est lui maintenant.
- **L'agent est le moteur.** Il **encapsule le métier** dans une **architecture hexagonale** : le domaine pur au centre — le différenciateur —, et autour des **adaptateurs** qui parlent aux **applications tierces** (Strava, et demain d'autres). Le métier ne dépend d'aucune appli ; les applis ne sont que des sources de données interchangeables. C'est exactement ce que décrit Nadella : la logique métier quitte le SaaS et s'installe dans la couche agent.
- **La persistance est une mémoire, pas une base.** Inspirée du *second cerveau* : un **log utilisateur** (ce que tu vis, écrit par toi) et un **wiki d'agent** qui **compresse sa propre mémoire** — il distille, relie, et finit par lire ce qu'il a compris plutôt que de tout re-dériver à chaque fois.

C'est ça, une app IA-native : non pas un frontend posé sur une IA, mais **un moteur entier reconstruit dans l'agent**, derrière le LLM, avec sa mémoire à lui. L'utilisateur n'ouvre pas mon app — il installe mon agent sur sa propre IA.

## Ce que feezify est devenu

J'ai gardé le nom et la méthode. J'ai jeté tout le reste.

feezify est maintenant **un agent : un cœur métier — la méthode — et une mémoire, dans un dossier de markdown qui t'appartient.** Tu l'installes sur ton IA (Claude, ou un agent self-hosté comme OpenClaw) et tu lui demandes comment tu vas aujourd'hui. Zéro infra.

Quelques décisions de design, en dev :

- **Architecture hexagonale.** Au centre, un domaine *pur* : le calcul de charge et la règle de croisement. Aucune entrée/sortie, aucun nom de provider. C'est le différenciateur, et c'est la seule partie vraiment testée. Autour, des **adaptateurs** interchangeables — Strava n'est qu'un fournisseur parmi d'autres, pas un chemin câblé. Ajouter une surface (une skill Claude, une skill OpenClaw) coûte presque rien : même moteur, manifeste différent.
- **Deux mémoires.** Ton **journal**, que *tu* écris (le brut, immuable). Et la **mémoire du coach**, que l'IA compile et maintient pour elle-même — le pattern « LLM Wiki » d'Andrej Karpathy : *arrête de re-dériver, commence à compiler.* Avec le temps, l'IA cesse de relire des mois de journal et lit ce qu'elle a déjà appris de toi, chaque affirmation tracée jusqu'à un jour précis.
- **Un copilote, pas un coach.** Il lit, il éclaire, il pose une couleur sur la journée et explique pourquoi. **C'est toi qui décides.** Il ne prescrit pas de séance. Cette ligne n'est pas un détail : c'est une règle de conception.

Et — c'est le point qui compte — **la méthode est ouverte.** Le dépôt est public. Mon rempart, ce n'est pas le code : c'est la méthode, la voix, la distribution. Autant la mettre à découvert.

## Pourquoi je raconte ça

Parce que c'est, je crois, le mouvement de fond : on arrête de construire des apps, on construit des **agents qui s'installent sur l'IA des gens.** Et que la meilleure façon de comprendre une techno, c'est de la montrer par le vécu — ici, un vieux projet à moi, ressuscité autrement.

Si tu lis tes propres données d'entraînement, feezify arrive en beta : la page — avec la liste d'attente pour l'avant-première — est **[ici](/feezify.html)**.

Et si tu construis des choses avec des agents, le dépôt est ouvert : **[github.com/jn-prod/feezify](https://github.com/jn-prod/feezify)**. La méthode est dedans, en clair.

*(Brouillon — version de travail. Liens finalisés à la publication.)*
