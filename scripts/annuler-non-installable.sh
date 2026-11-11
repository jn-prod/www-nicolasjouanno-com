#!/usr/bin/env bash
# Annule sur main les commits d'un push qui rendent le site non installable (dépendances Node
# ou Ruby refusées). Lancé par le déploiement quand l'installation échoue ; le job reste rouge.
#
#   bash scripts/annuler-non-installable.sh <commit avant le push> <dernier commit du push>
#
# Rien n'est annulé si le push ne touche à aucun fichier de dépendances : l'échec vient alors
# de l'environnement (réseau, registre), pas du commit. Ni si l'historique n'est pas linéaire
# (première branche, push forcé) : l'échec reste rouge, à traiter à la main.
set -euo pipefail

avant=$1
apres=$2
dependances=(package.json pnpm-lock.yaml pnpm-workspace.yaml .nvmrc Gemfile Gemfile.lock .ruby-version)

if [[ "$avant" =~ ^0+$ ]] || ! git merge-base --is-ancestor "$avant" "$apres" 2>/dev/null; then
  echo "annuler-non-installable — historique non linéaire, rien n'est annulé."
  exit 0
fi

if git diff --quiet "$avant" "$apres" -- "${dependances[@]}"; then
  echo "annuler-non-installable — aucune dépendance modifiée (réseau ou registre ?), rien n'est annulé."
  exit 0
fi

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git fetch --quiet origin main
git checkout --quiet -B main origin/main
git revert --no-edit "$avant..$apres"
git push --quiet origin main
echo "annuler-non-installable — commits annulés sur main : $(git log --format=%h "$avant..$apres" | tr '\n' ' ')"
