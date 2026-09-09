#!/usr/bin/env ruby
# frozen_string_literal: true

require "pathname"
require "yaml"

ROOT = Pathname.new(__dir__).join("..").expand_path
POSTS_DIR = ROOT.join("_posts")
IMAGES_DIST = ROOT.join("images-dist")
errors = []

def local_image_path(path)
  value = path.to_s.strip
  return if value.empty? || value.match?(%r{\Ahttps?://})

  relative = value.delete_prefix("/")
    .delete_prefix("assets/images/")
    .delete_prefix("images/")
  relative = "posts/#{relative}" unless relative.include?("/")
  relative.sub(/\.(?:jpe?g|png)\z/i, ".webp")
end

def image_exists?(relative)
  IMAGES_DIST.join(relative).file?
end

POSTS_DIR.glob("*.md").each do |post_path|
  content = post_path.read
  match = content.match(/\A---\s*\n(.*?)\n---\s*\n/m)
  next unless match

  frontmatter = YAML.safe_load(match[1], permitted_classes: [Date, Time], aliases: true) || {}
  images = [frontmatter["image"], *Array(frontmatter["images"])].compact
  body = content.delete_prefix(match[0])

  images.each do |image|
    relative = local_image_path(image)
    next unless relative

    errors << "#{post_path.basename}: dérivé absent /images/#{relative}" unless image_exists?(relative)
    if image.to_s.include?("/images/") && body.include?(File.basename(image.to_s))
      errors << "#{post_path.basename}: image de couverture répétée dans le contenu (supprimer le doublon ou choisir une autre image)"
    end
  end
rescue Psych::SyntaxError => e
  errors << "#{post_path.basename}: front matter invalide (#{e.message})"
end

content_files = [
  ROOT.join("*.md"),
  ROOT.join("*.html"),
  ROOT.join("_posts/**/*.md"),
  ROOT.join("_includes/**/*.{html,md}"),
  ROOT.join("_layouts/**/*.{html,md}"),
  ROOT.join("apps/**/*.{html,md,js}"),
  ROOT.join("assets/**/*.{css,js}"),
].flat_map { |pattern| Dir.glob(pattern.to_s, File::FNM_EXTGLOB) }
  .reject { |file| Pathname.new(file).basename.to_s == "README.md" }

content_files.uniq.each do |file|
  Pathname.new(file).read.scan(%r{/images/([^\s"'`<>()]+)}) do |match|
    relative = match.first.split(/[?#]/, 2).first
    next if relative.empty? || relative.include?("{{")

    errors << "#{Pathname.new(file).relative_path_from(ROOT)}: image introuvable /images/#{relative}" unless image_exists?(relative)
  end
end

unless errors.empty?
  warn "Content image check failed:"
  errors.each { |error| warn "- #{error}" }
  exit 1
end

puts "Content image check OK."
