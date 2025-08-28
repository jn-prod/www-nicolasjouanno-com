---
layout: page
title: Formulaire de contact
permalink:
categories:
tags:
redirect_from:
---

# Formulaire de contact

Une question, une idée, ou simplement envie d’échanger ?

Écrivez-moi via ce formulaire, je réponds toujours avec plaisir.

<form action="https://formsubmit.co/me@nicolasjouanno.com" method="POST">

      <!-- Champs visibles -->
      <p>Tous les champs sont obligatoires</p>

      <label for="name">Nom</label>

      <input type="text" id="name" name="name" required>

      <label for="email">Votre e-mail</label>

      <input type="email" id="email" name="replyto" required>

      <label for="message">Message</label>

      <textarea id="message" name="message" rows="6" required></textarea>

      <!-- Champs cachés -->

      <input type="hidden" name="_next" value="https://nicolasjouanno.com/">

      <input type="hidden" name="_subject" value="formulaire de contact nicolasjouanno.com">

      <button type="submit" class="c-button c-button--primary">Envoyer</button>

</form>
