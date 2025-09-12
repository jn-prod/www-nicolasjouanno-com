---
layout: page
title: Agenda
permalink: /agenda/
---

# 📅 Mon agenda

Vous pouvez aussi <a href="/agenda.ics">vous abonner à la version ICS</a>.

## Événements à venir

{% assign upcoming = site.events | where_exp: "e", "e.end > site.time" | sort: "start" %}
{% for event in upcoming %}
- <a href="{{ event.url | relative_url }}"><strong>{{ event.title }}</strong></a> : {{ event.start | date: "%d %B %Y" }}{% if event.end %} → {{ event.end | date: "%d %B %Y" }}.{% endif %}{{ event.location }}.
{% endfor %}

## Événements passés

{% assign past = site.events | where_exp: "e", "e.end < site.time" | sort: "start" %}
{% for event in past %}
- <a href="{{ event.url | relative_url }}"><strong>{{ event.title }}</strong></a> : {{ event.start | date: "%d %B %Y" }}{% if event.end %} → {{ event.end | date: "%d %B %Y" }}.{% endif %}{{ event.location }}.
{% endfor %}