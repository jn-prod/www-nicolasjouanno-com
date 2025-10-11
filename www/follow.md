---
layout: page
permalink: /follow.html
title: Suivre mes publications
description: Tout se passe ici, sur mon site.  Si vous souhaitez rester connecté, plusieurs options simples et durables sont disponibles
---
# Suivre mes publications

Je ne suis pas présent sur les réseaux sociaux traditionnels.  
Tout se passe ici, sur mon site.  
Si vous souhaitez rester connecté, plusieurs options simples et durables sont disponibles :

## 📧 Par email (recommandé)

Le plus pratique : recevez mes nouveaux articles directement dans votre boîte mail.  
Service automatique basé sur mon flux RSS, sans inscription complexe.

➡️ [S’abonner par email](https://blogtrottr.com/?subscribe=https://nicolasjouanno.com/feed.xml)

## 📡 Flux RSS

Le moyen le plus simple et le plus universel.  
Ajoutez mon flux RSS à votre lecteur favori (Feedly, NetNewsWire, Inoreader…).

➡️ [S’abonner au flux RSS](/feed.xml)

## 📝 JSON Feed
Une alternative moderne au RSS, lisible par certains lecteurs.

➡️ [S'abonner en JSON Feed](/feed.json)  

## 📅 Flux Calendrier (ICS)

Idéal si vous voulez suivre mes sorties, voyages ou événements. [Voir l’agenda](/agenda/)
Ajoutez le flux à votre application d'agenda (Google Calendar, iCal, Outlook…).  

➡️ [Ajouter à mon agenda (ICS)](/agenda.ics)  

## 📌 Ajouter aux favoris

Tous les navigateurs permettent d’ajouter un site en favoris depuis leur menu principal.  
C’est une manière simple et universelle de garder ce site à portée de clic.

## 📱 Application mobile

Ajoutez mon site directement à votre écran d’accueil pour l’ouvrir comme une application native.

### 👉 Sur votre navigateur mobile :

- **iOS (Safari)** : bouton *Partager* → *Ajouter à l’écran d’accueil*
- **Android (Chrome/Firefox)** : menu ⋮ → *Ajouter à l’écran d’accueil*
- **Bureau** : favoris ou raccourci sur le bureau

## 🔔 Notifications (optionnel)

Pour les plus connectés, activez les notifications push web :

<button id="subscribe-notifications" class="c-button c-button--dark">
  Activer les notifications
</button>

## 📤 Partager mes articles

Pas besoin de boutons : votre navigateur fait ça très bien !
### 👉 Sur mobile :

- Bouton Partager natif dans la barre du navigateur
- Menu contextuel avec toutes vos apps préférées

### 👉 Sur ordinateur :

- Copier l’URL depuis la barre d’adresse
- Glisser-déposer l’onglet dans un email/message/reseau social favoris 
- Ctrl+L puis Ctrl+C (raccourci rapide)

## 💬 Interactions

Je construis une expérience simple et respectueuse de vos données.  
Vous pouvez maintenant :

- **Commenter** les articles (systèmes Webmention et Disqus disponibles)
- **Partager** les publications directement depuis votre navigateur
- Me **contacter** via le [formulaire dédié](/contact.html)

<!-- TODO: ajouter WebSub pour notifications automatiques -->

<!-- TODO: envisager Webmention pour réponses/likes cross-site -->

## 🌱 Esprit slow web

Ici, pas d’algorithme, pas de pub, pas de suivi intrusif.  
**Vous choisissez comment et quand suivre mes publications.**

C’est une approche minimaliste, durable et indépendante des plateformes sociales.  
Votre attention n’est pas un produit, c’est un cadeau que je respecte.

-----

## ❓ Besoin d’aide ?

- **RSS, c’est quoi ?** → [Guide débutant RSS](https://aboutfeeds.com/)
- **Lecteurs RSS que j’utilise** → [Feedly](https://feedly.com) (web,mobile)
- **Questions ?** → [Me contacter](/contact.html)

<script>
// browser notification
document.getElementById('subscribe-notifications').addEventListener('click', function() {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        this.textContent = '✅ Notifications activées';
        this.disabled = true;
      } else {
        this.textContent = '❌ Permissions refusées';
      }
    });
  } else {
    this.textContent = '❌ Non supporté par ce navigateur';
  }
});
</script>