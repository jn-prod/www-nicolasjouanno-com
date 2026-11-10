#!/usr/bin/env ruby
# frozen_string_literal: true

# Lit le flux de La Sortie sur Substack et écrit les derniers posts dans
# _data/substack.json (accueil, encart d'inscription). Les couvertures sont copiées dans
# images/substack/ : nj.com les sert lui-même, sans requête vers Substack à la visite.
# Les deux sont versionnés : Substack refuse le flux aux machines de GitHub Actions (403),
# le build y garde alors l'instantané du dépôt. Le rafraîchir depuis le VPS après chaque
# post Substack : `pnpm fetch:substack`, puis commit. Sans instantané, le build échoue.
# Couverture injoignable : le post s'affiche sans image.
require "cgi"
require "json"
require "net/http"
require "pathname"
require "rexml/document"
require "time"
require "yaml"

ROOT = Pathname.new(__dir__).join("..").expand_path
LIMIT = 5
WORDS = 70
CDN = "https://substackcdn.com/image/fetch/w_1200,c_limit,f_jpg,q_auto:good/"

def get(url, redirects = 3)
  response = Net::HTTP.get_response(URI(url))
  return get(response["location"], redirects - 1) if response.is_a?(Net::HTTPRedirection) && redirects.positive?

  response
end

def field(item, name)
  item.elements[name]&.text.to_s
end

def text(html)
  block = %r{</?(?:p|div|h\d|li|ul|ol|blockquote|figure|figcaption|br)\b[^>]*>}i
  CGI.unescapeHTML(html.to_s.gsub(block, " ").gsub(/<[^>]+>/, "")).gsub(/\s+/, " ").strip
end

def excerpt(html)
  text(html).split.first(WORDS + 1).join(" ")
end

# Les mots en trop sont coupés par components/post.html (truncatewords: 70), qui ajoute « ... ».
# Le sous-titre du post s'il en a un ; sinon Substack met le début du texte en description,
# et l'accueil prend alors les premiers mots du texte, comme pour un post de nj.com.
def summary(item)
  subtitle = text(field(item, "description"))
  body = text(field(item, "content:encoded").gsub(%r{<figure.*?</figure>}m, " "))
  return excerpt(body) if subtitle.empty? || body.start_with?(subtitle)

  subtitle
end

feed_url = YAML.safe_load(ROOT.join("_config.yml").read).dig("substack", "feed")
response = get(feed_url)
DATA = ROOT.join("_data", "substack.json")
unless response.is_a?(Net::HTTPSuccess)
  abort "fetch:substack — #{feed_url} : HTTP #{response.code}, aucun instantané" unless DATA.exist?

  puts "fetch:substack — #{feed_url} : HTTP #{response.code}, instantané du dépôt gardé."
  exit
end

items = REXML::Document.new(response.body).get_elements("//item").first(LIMIT)
abort "fetch:substack — aucun post dans #{feed_url}" if items.empty?

images = ROOT.join("images", "substack")
images.rmtree if images.exist?
images.mkpath

posts = items.map do |item|
  url = field(item, "link").strip
  slug = url[%r{/p/([^/?#]+)}, 1]
  post = {
    "title" => text(field(item, "title")),
    "url" => url,
    "slug" => "substack-#{slug}",
    "date" => Time.rfc2822(field(item, "pubDate")).iso8601,
    "description" => summary(item)
  }
  cover = item.get_elements("enclosure").first&.attributes&.[]("url")
  if cover
    image = get(CDN + CGI.escape(cover))
    if image.is_a?(Net::HTTPSuccess) && image["content-type"].to_s.start_with?("image/jpeg")
      images.join("#{slug}.jpg").binwrite(image.body)
      post["image"] = "/images/substack/#{slug}.webp"
    else
      warn "fetch:substack — couverture de « #{post['title']} » injoignable (#{image.code}), post sans image"
    end
  end
  post
end

DATA.write("#{JSON.pretty_generate(posts)}\n")
puts "fetch:substack — #{posts.size} posts, #{posts.count { |post| post['image'] }} couvertures."
