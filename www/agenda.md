---
layout: page
title: Agenda
description: "Mes prochaines conférences, meetups et événements web. Calendrier de mes prises de parole sur l'accessibilité, les Web Components et le design system."
permalink: /agenda/
---

# 📅 Mon agenda

Vous pouvez aussi <a href="/agenda.ics">vous abonner à la version ICS</a>.

{% assign upcoming = site.events | sort: "start" | reverse %}
{% for event in upcoming %}

- <a href="{{ event.url | relative_url }}"><strong>{{ event.title }}</strong></a> : {{ event.start | date: "%d %B %Y" }}{% if event.end %} → {{ event.end | date: "%d %B %Y" }}.{% endif %}{{ event.location }}.
  {% endfor %}
