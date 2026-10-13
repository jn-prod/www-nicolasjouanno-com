# Brouillons de newsletter

Ce dossier contient les éditions en cours. Son contenu n'est pas publié tant qu'il
reste dans `_drafts/`.

## Préparer une édition

1. Copier `_templates/newsletter.md` dans ce dossier et renseigner le front matter.
2. Générer la matière calendrier sur le VPS, depuis vtt.bzh :
   `pnpm newsletter:new -- --start=YYYY-MM-DD --end=YYYY-MM-DD`.
3. Reprendre uniquement les faits vérifiés et les sorties retenues depuis le brief
   produit dans `vtt.bzh/www/_drafts/`.
4. Écrire l'angle, le récit et les appels à contribution à partir du vécu ou de
   contributions autorisées. Lorsqu'une photo personnelle porte l'édito, la déclarer
   comme couverture dans le front matter pour l'archive et le RSS, puis la contextualiser
   dans le texte sans répéter le fichier image dans le corps. Renseigner `image_alt`
   pour la description accessible et `image_caption` pour la légende ou le crédit visible.
   Cette légende est le premier temps du récit : elle situe la photo et formule un vécu,
   puis termine le crédit par `Appareil © Auteur`, sans tiret ni pictogramme. Elle accepte
   les liens Markdown.
5. Garder « La Sortie du mois » comme sujet outdoor principal. Les rubriques secondaires
   sont facultatives : conserver « La halte sans gluten », « La Sortie matos » ou une voix
   du terrain seulement lorsqu'une matière réelle justifie leur présence, puis supprimer
   les blocs inutilisés.
6. Pour « La halte sans gluten », partir d'une situation vécue pendant une sortie ou un
   voyage et expliciter les limites de l'expérience sans présenter une adresse comme
   certifiée.
7. Pour « La Sortie matos », retenir un à trois sujets utiles, remonter à la source
   primaire et distinguer explicitement ce qui a été `testé`, `utilisé` ou seulement
   `repéré`. Indiquer tout lien affilié, prêt de matériel ou partenariat.
8. Relire liens, informations pratiques et formulation avant publication.
9. Une fois l'édition prête, la déplacer dans `_posts/`, puis l'envoyer manuellement
   dans Kit à la liste consentie.

## Rôles

- `_templates/newsletter.md` ne porte que la structure d'une édition.
- `vtt.bzh/www/_drafts/` contient la matière calendrier factuelle.
- Ce dossier porte l'édition éditoriale avant sa publication sur nj.com.

Il n'y a ni action GitHub de génération, ni convention de branche, ni envoi
automatique.
