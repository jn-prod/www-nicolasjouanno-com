#!/usr/bin/env ruby
# frozen_string_literal: true

# Module Substack (README, « Écosystème IndieWeb ») : ajoute un post de La Sortie au flux
# _data/flux/substack.json, saisi à la main, car Substack refuse son flux aux machines de GitHub
# Actions (403). Lancé par le workflow « Ajouter un post Substack », ou en local :
#
#   ruby scripts/add-substack-post.rb --url=… --titre=… --sous-titre=… [--date=AAAA-MM-JJ] [--couverture=…]
#
# Un post déjà présent (même URL) est remplacé. Le flux garde les 10 plus récents (5 sur
# l'accueil, 10 dans les flux du site). La couverture est téléchargée dans images/substack/ :
# nj.com la sert lui-même ; injoignable, le post s'affiche sans image.
require "cgi"
require "json"
require "net/http"
require "pathname"
require "time"
require "yaml"

ROOT = Pathname.new(__dir__).join("..").expand_path
DATA = ROOT.join("_data", "flux", "substack.json")
IMAGES = ROOT.join("images", "substack")
LIMIT = 10
CDN = "https://substackcdn.com/image/fetch/w_1200,c_limit,f_jpg,q_auto:good/"

def option(name)
  ARGV.find { |arg| arg.start_with?("--#{name}=") }&.split("=", 2)&.last.to_s.strip
end

def get(url, redirects = 3)
  response = Net::HTTP.get_response(URI(url))
  return get(response["location"], redirects - 1) if response.is_a?(Net::HTTPRedirection) && redirects.positive?

  response
end

# L'adresse copiée depuis Substack est souvent déjà une adresse du CDN, avec ses propres
# réglages : on en extrait l'image d'origine pour la redemander en JPEG de 1 200 px.
def cover_source(url)
  inner = url[%r{substackcdn\.com/image/fetch/[^/]+/(https?(?:%3A|:).+)\z}, 1]
  inner ? CGI.unescape(inner) : url
end

publication = URI(YAML.safe_load(ROOT.join("_config.yml").read).dig("plateformes", "substack", "url")).host
url = option("url")
title = option("titre")
description = option("sous-titre")
date = option("date")
cover = option("couverture")

slug = url[%r{\Ahttps://#{Regexp.escape(publication)}/p/([^/?#]+)}, 1]
abort "add-substack-post — --url doit être un post de https://#{publication}/p/…" unless slug
abort "add-substack-post — --titre obligatoire" if title.empty?
abort "add-substack-post — --sous-titre obligatoire (résumé de l'accueil et des flux)" if description.empty?
date = Time.now.getlocal("+01:00").strftime("%Y-%m-%d") if date.empty?
abort "add-substack-post — --date au format AAAA-MM-JJ" unless date.match?(/\A\d{4}-\d{2}-\d{2}\z/)

post = {
  "title" => title,
  "url" => url,
  "slug" => "substack-#{slug}",
  "date" => "#{date}T07:00:00+00:00",
  "description" => description
}

IMAGES.mkpath
unless cover.empty?
  image = begin
    get(CDN + CGI.escape(cover_source(cover)))
  rescue StandardError => e
    warn "add-substack-post — couverture injoignable (#{e.class}), post sans image"
    nil
  end
  if image.is_a?(Net::HTTPSuccess) && image["content-type"].to_s.start_with?("image/jpeg")
    IMAGES.join("#{slug}.jpg").binwrite(image.body)
    post["image"] = "/images/substack/#{slug}.webp"
  elsif image
    warn "add-substack-post — couverture injoignable (HTTP #{image.code}), post sans image"
  end
end

posts = DATA.exist? ? JSON.parse(DATA.read) : []
posts = (posts.reject { |entry| entry["url"] == url } << post).sort_by { |entry| entry["date"] }.reverse.first(LIMIT)

# Les couvertures des posts sortis du flux quittent aussi le dépôt.
kept = posts.filter_map { |entry| entry["image"] && File.basename(entry["image"], ".webp") }
IMAGES.glob("*.jpg").each { |file| file.delete unless kept.include?(file.basename(".jpg").to_s) }

DATA.dirname.mkpath
DATA.write("#{JSON.pretty_generate(posts)}\n")
puts "add-substack-post — « #{title} » (#{date}) #{post['image'] ? 'avec' : 'sans'} couverture ; #{posts.size} posts dans le flux."
