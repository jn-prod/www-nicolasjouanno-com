#!/usr/bin/env bash
# Attend le prochain créneau de publication. CRENEAUX (secret du dépôt) : plages d'attente en
# semaine, heure de Paris, au format HHMM-HHMM,HHMM-HHMM. Sans lui, échec : rien ne part.
# Attente plafonnée à 350 min, sous la limite de 6 h d'un job : le job suivant attend le reste.
set -eu

if ! [[ "${CRENEAUX:-}" =~ ^[0-9]{4}-[0-9]{4}(,[0-9]{4}-[0-9]{4})*$ ]]; then
  echo "CRENEAUX manquant ou invalide." >&2
  exit 1
fi

now=$(date +%s)
jour=$(TZ=Europe/Paris date +%F)
hm=$((10#$(TZ=Europe/Paris date +%H%M)))
fin=""
if [ "$(TZ=Europe/Paris date +%u)" -le 5 ]; then
  for plage in ${CRENEAUX//,/ }; do
    borne=${plage#*-}
    if [ "$hm" -ge "$((10#${plage%-*}))" ] && [ "$hm" -lt "$((10#$borne))" ]; then fin=$borne; fi
  done
fi
if [ -z "$fin" ]; then
  echo "Rien à attendre."
  exit 0
fi

attente=$(($(TZ=Europe/Paris date -d "$jour ${fin:0:2}:${fin:2:2}" +%s) - now))
[ "$attente" -gt 21000 ] && attente=21000
echo "::notice::Départ différé. Annuler le run pour renoncer."
sleep "$attente"
