---
layout: page
title: Agenda
permalink: /agenda/
---

# 📅 Mon agenda

Vous pouvez aussi <a href="/agenda.ics">vous abonner à la version ICS</a>.

{% assign upcoming = site.events | sort: "start", "last" %}
{% for event in upcoming %}
- <a href="{{ event.url | relative_url }}"><strong>{{ event.title }}</strong></a> : {{ event.start | date: "%d %B %Y" }}{% if event.end %} → {{ event.end | date: "%d %B %Y" }}.{% endif %}{{ event.location }}.
{% endfor %}

