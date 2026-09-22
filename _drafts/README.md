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
   contributions autorisées ; ajouter une photo personnelle si elle est pertinente.
5. Relire liens, informations pratiques et formulation avant publication.
6. Une fois l'édition prête, la déplacer dans `_posts/`, puis l'envoyer manuellement
   dans Kit à la liste consentie.

## Rôles

- `_templates/newsletter.md` ne porte que la structure d'une édition.
- `vtt.bzh/www/_drafts/` contient la matière calendrier factuelle.
- Ce dossier porte l'édition éditoriale avant sa publication sur nj.com.

Il n'y a ni action GitHub de génération, ni convention de branche, ni envoi
automatique.
