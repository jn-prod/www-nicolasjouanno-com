---
layout: page
title: Agenda et interventions
description: "Mes conférences, meetups et événements web passés ou à venir autour de l'accessibilité, des Web Components et du design system."
permalink: /agenda/
positioning: work
---

# 📅 Agenda et interventions

Les prochaines dates, puis l'archive de mes interventions publiques.

{% assign current_timestamp = site.time | date: "%s" | plus: 0 %}
{% assign events_ascending = site.events | sort: "start" %}
{% assign upcoming_count = 0 %}

## À venir

{% for event in events_ascending %}
{% assign event_end_timestamp = event.end | default: event.start | date: "%s" | plus: 0 %}
{% if event_end_timestamp >= current_timestamp %}
{% assign upcoming_count = upcoming_count | plus: 1 %}

- <a href="{{ event.url | relative_url }}"><strong>{{ event.title }}</strong></a> — {{ event.start | date: "%d/%m/%Y" }}{% if event.end %} au {{ event.end | date: "%d/%m/%Y" }}{% endif %} · {{ event.location }}.
  {% endif %}
  {% endfor %}

{% if upcoming_count == 0 %}
Aucune intervention annoncée pour le moment.
{% else %}
<p><a href="/agenda.ics">S'abonner au calendrier au format ICS</a>.</p>
{% endif %}

## Interventions passées

{% assign events_descending = site.events | sort: "start" | reverse %}
{% for event in events_descending %}
{% assign event_end_timestamp = event.end | default: event.start | date: "%s" | plus: 0 %}
{% if event_end_timestamp < current_timestamp %}

- <a href="{{ event.url | relative_url }}"><strong>{{ event.title }}</strong></a> — {{ event.start | date: "%d/%m/%Y" }}{% if event.end %} au {{ event.end | date: "%d/%m/%Y" }}{% endif %} · {{ event.location }}.
  {% endif %}
  {% endfor %}
