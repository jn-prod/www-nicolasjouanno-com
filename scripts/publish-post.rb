#!/usr/bin/env ruby
# frozen_string_literal: true

# Publie un brouillon : _drafts/<slug>.md devient _posts/<date>-<slug>.md.
#
#   pnpm publish:post <slug> [--date=AAAA-MM-JJ] [--pin]
#
# Sans --date, la date du jour à Paris. Une date future est publiée par le build
# quotidien (future: false). --pin transfère l'épingle depuis le post qui la porte.
# Le script refuse un brouillon qui contient encore une consigne entre crochets ou un
# commentaire HTML : rien de ce qui est destiné à l'auteur ne doit partir en ligne.
# Il ne commite rien ; la GitHub Action « Publier un post » commite et déploie.
require "date"
require "pathname"
require "yaml"

ROOT = Pathname.new(__dir__).join("..").expand_path
DRAFTS = ROOT.join("_drafts")
POSTS = ROOT.join("_posts")
FRONT_MATTER = /\A---\n(.*?\n)---\n/m.freeze
# Une consigne d'auteur : texte entre crochets d'au moins 20 caractères, hors lien Markdown.
PLACEHOLDER = /\[[^\]\n]{20,}\](?![(\[])/.freeze

def fail_with(message)
  warn "publish:post — #{message}"
  exit 1
end

args = ARGV.reject { |argument| argument == "--" }
slug = args.find { |argument| !argument.start_with?("--") }
fail_with("usage : pnpm publish:post <slug> [--date=AAAA-MM-JJ] [--pin]") unless slug
slug = File.basename(slug, ".md")
pin = args.include?("--pin")
date_argument = args.find { |argument| argument.start_with?("--date=") }&.delete_prefix("--date=")

date =
  if date_argument.to_s.empty?
    Date.parse(`TZ=Europe/Paris date +%F`.strip)
  else
    begin
      Date.iso8601(date_argument)
    rescue Date::Error
      fail_with("date invalide : #{date_argument} (attendu AAAA-MM-JJ)")
    end
  end

draft = DRAFTS.join("#{slug}.md")
fail_with("brouillon introuvable : _drafts/#{slug}.md") unless draft.file?
target = POSTS.join("#{date.iso8601}-#{slug}.md")
fail_with("déjà publié : #{target.relative_path_from(ROOT)}") if target.exist?

content = draft.read
match = content.match(FRONT_MATTER) || fail_with("front matter absent")
front_matter = YAML.safe_load(match[1], permitted_classes: [Date, Time]) || {}
body = match.post_match

errors = []
%w[title description category].each do |key|
  errors << "#{key} est vide" if front_matter[key].to_s.strip.empty?
end
if front_matter["category"] == "newsletter" || pin
  %w[image image_alt].each do |key|
    errors << "#{key} est vide (couverture obligatoire)" if front_matter[key].to_s.strip.empty?
  end
end
errors << "commentaire HTML restant (<!-- … -->)" if content.include?("<!--")
body.scan(PLACEHOLDER).first(5).each { |placeholder| errors << "consigne restante : #{placeholder[0, 80]}" }
fail_with("brouillon pas prêt :\n  - #{errors.join("\n  - ")}") unless errors.empty?

if pin
  POSTS.glob("*.md").each do |post|
    text = post.read
    next unless text.match(FRONT_MATTER)&.[](1)&.match?(/^pin: true$/)

    post.write(text.sub(/^pin: true\n/, ""))
    puts "épingle retirée : #{post.relative_path_from(ROOT)}"
  end
  content = content.sub(FRONT_MATTER) { "---\n#{Regexp.last_match(1)}pin: true\n---\n" }
end

target.write(content)
draft.delete
puts "publié : #{target.relative_path_from(ROOT)}#{date > Date.parse(`TZ=Europe/Paris date +%F`.strip) ? " (en ligne le #{date.iso8601})" : ""}"
