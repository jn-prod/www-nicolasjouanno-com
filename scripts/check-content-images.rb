#!/usr/bin/env ruby
# frozen_string_literal: true

require "pathname"
require "yaml"

ROOT = Pathname.new(__dir__).join("..").expand_path
POSTS_DIR = ROOT.join("_posts")
IMAGES_DIST = ROOT.join("images-dist")
errors = []

POSTS_DIR.glob("*.md").each do |post_path|
  content = post_path.read
  match = content.match(/\A---\s*\n(.*?)\n---\s*\n/m)
  next unless match

  frontmatter = YAML.safe_load(match[1], permitted_classes: [Date, Time], aliases: true) || {}
  images = [frontmatter["image"], *Array(frontmatter["images"])].compact

  images.each do |image|
    path = image.to_s.strip
    next if path.empty? || path.match?(%r{\Ahttps?://})

    relative = path.delete_prefix("/")
      .delete_prefix("images-src/")
      .delete_prefix("assets/images/")
      .delete_prefix("images/")
    relative = "posts/#{relative}" unless relative.include?("/")
    derivative = relative.sub(/\.(?:jpe?g|png)\z/i, ".webp")
    errors << "#{post_path.basename}: dérivé absent /images/#{derivative}" unless IMAGES_DIST.join(derivative).file?
  end
rescue Psych::SyntaxError => e
  errors << "#{post_path.basename}: front matter invalide (#{e.message})"
end

unless errors.empty?
  warn "Content image check failed:"
  errors.each { |error| warn "- #{error}" }
  exit 1
end

puts "Content image check OK."
