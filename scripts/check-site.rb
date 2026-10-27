#!/usr/bin/env ruby
# frozen_string_literal: true

# Contrôles du site généré (_site), lancés à la fin de `pnpm build`, donc aussi en CI :
# - aucun lien interne cassé entre pages ;
# - canonical toujours sur www, jamais sur le domaine nu ;
# - flux XML bien formés et commençant par <?xml, flux JSON valides.
require "json"
require "pathname"
require "rexml/document"

SITE = Pathname.new(__dir__).join("..", "_site").expand_path
ASSET = /\.(svg|png|webp|jpe?g|gif|ico|css|m?js|json|xml|ics|pdf|txt|woff2?)\z/i.freeze
REDIRECT = 'http-equiv="refresh"'

abort "check:site — _site absent, lancer le build d'abord." unless SITE.directory?

errors = []
pages = SITE.glob("**/*.html").reject { |page| page.read.include?(REDIRECT) }

pages.each do |page|
  html = page.read
  html.scan(%r{href="(/[^"#?]*)}).flatten.uniq.each do |path|
    next if path.match?(ASSET)

    target = path.end_with?("/") ? SITE.join(".#{path}index.html") : SITE.join(".#{path}")
    next if target.exist? || SITE.join(".#{path}.html").exist?

    errors << "lien interne cassé #{path} dans #{page.relative_path_from(SITE)}"
  end
  html.scan(/rel="canonical" href="([^"]*)"/).flatten.each do |canonical|
    errors << "canonical sans www #{canonical} dans #{page.relative_path_from(SITE)}" if canonical.match?(%r{://nicolasjouanno\.com})
  end
end

SITE.glob("**/*.xml").each do |feed|
  raw = feed.read
  next if raw.include?(REDIRECT)

  name = feed.relative_path_from(SITE)
  next errors << "#{name} ne commence pas par <?xml" unless raw.start_with?("<?xml")

  begin
    REXML::Document.new(raw)
  rescue REXML::ParseException => e
    errors << "#{name} mal formé : #{e.message.lines.first.strip}"
  end
end

SITE.glob("**/{feed*,editions}.json").each do |feed|
  JSON.parse(feed.read)
rescue JSON::ParserError => e
  errors << "#{feed.relative_path_from(SITE)} JSON invalide : #{e.message[0, 80]}"
end

if errors.empty?
  puts "check:site — #{pages.size} pages, liens, canonical et flux OK."
else
  warn "check:site — #{errors.size} erreur(s) :\n  #{errors.uniq.join("\n  ")}"
  exit 1
end
