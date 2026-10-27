# Brouillons de newsletter

Ce dossier contient les éditions en cours. Son contenu n'est pas publié tant qu'il
reste dans `_drafts/`.

## Préparer une édition

1. Copier `_templates/newsletter.md` dans ce dossier et renseigner le front matter. Le
   titre annonce l’angle éditorial de l’édition : il ne contient ni numéro, ni saison,
   ni mois seul, ni préfixe « La Sortie ». La description complète cette promesse avec
   son contexte ou un fait précis ; elle ne répète pas simplement le titre.
2. La matière calendrier arrive seule le 15 dans `vtt.bzh/www/_drafts/` (« Brief La Sortie »,
   du 1er du mois suivant au 1er + 35 jours), avec un rappel sur corp-ai jusqu'à la
   publication, au plus tard le dernier jour du mois. Autre fenêtre : onglet Actions de
   vtt.bzh, ou en local `pnpm newsletter:new -- --start=AAAA-MM-JJ --end=AAAA-MM-JJ`.
3. Reprendre uniquement les faits vérifiés et les sorties retenues depuis ce brief.
4. Écrire l'angle, le récit et les appels à contribution à partir du vécu ou de
   contributions autorisées. Lorsqu'une photo personnelle porte l'édito, la déclarer
   comme couverture dans le front matter pour l'archive et le RSS, puis la contextualiser
   dans le texte sans répéter le fichier image dans le corps. Renseigner `image_alt`
   pour la description accessible et `image_caption` pour la légende ou le crédit visible.
   Cette légende est le premier temps du récit : elle situe la photo et formule un vécu,
   puis termine le crédit par `Appareil © Auteur`, sans tiret ni pictogramme. Elle accepte
   les liens Markdown.
5. Garder « La Sortie du mois » comme sujet outdoor principal. Les rubriques secondaires
   du modèle sont facultatives : supprimer celles qui n'ont pas de matière réelle.
6. Relire liens, informations pratiques et formulation.
7. Publier avec « Publier un post » (onglet Actions, case « Épingler » cochée) ou
   `pnpm publish:post <brouillon> --pin` : voir le README du site. Le déploiement crée la
   campagne Kit en brouillon ; l'envoi se fait dans Kit, à la liste consentie.

## Idées

Une ligne par idée, supprimée une fois l'édition publiée. Aucune idée n'oblige à publier.

- Le dossard est une occasion, pas une finalité
- Le terrain avant la discipline
- Partir de chez soi : l'aventure sans destination lointaine
- Retrouver le plaisir de l'effort sans compteur
- Quand le sport loisir finit par épuiser (burn-out du sportif amateur, demande des témoignages)
- Baromètre « Randos en Bretagne » à partir des données du calendrier vtt.bzh

## Rôles

- `_templates/newsletter.md` ne porte que la structure d'une édition.
- `vtt.bzh/www/_drafts/` contient la matière calendrier factuelle.
- Ce dossier porte l'édition éditoriale avant sa publication sur nj.com.

Rien n'est envoyé automatiquement : la campagne Kit reste un brouillon jusqu'au clic.
