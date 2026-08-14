#!/usr/bin/env ruby
# frozen_string_literal: true

require "pathname"
require "set"
require "yaml"

ROOT = Pathname.new(__dir__).join("..").expand_path
TAXONOMIE_PATH = ROOT.join("_data", "taxonomie.yml")
POSTS_DIR = ROOT.join("_posts")

def fail_with(errors)
  return if errors.empty?

  warn "Positioning check failed:"
  errors.each { |error| warn "- #{error}" }
  exit 1
end

def frontmatter_for(path)
  content = path.read
  match = content.match(/\A---\s*\n(.*?)\n---\s*\n/m)
  return {} unless match

  YAML.safe_load(match[1], permitted_classes: [Date, Time], aliases: true) || {}
rescue Psych::SyntaxError => e
  { "__error" => e.message }
end

def page_exists_for?(permalink)
  normalized = permalink.to_s
  candidates =
    if normalized.end_with?("/")
      [
        ROOT.join(normalized.delete_prefix("/"), "index.md"),
        ROOT.join(normalized.delete_prefix("/"), "index.html")
      ]
    else
      stem = normalized.delete_prefix("/").sub(/\.html\z/, "")
      [
        ROOT.join("#{stem}.md"),
        ROOT.join("#{stem}.html")
      ]
    end

  candidates.any?(&:file?)
end

taxonomie = YAML.safe_load(TAXONOMIE_PATH.read, aliases: true)
verticales = taxonomie.fetch("verticales")
formats = taxonomie.fetch("formats")
errors = []

format_slugs = formats.map { |format| format.fetch("slug") }
verticale_slugs = verticales.map { |verticale| verticale.fetch("slug") }

duplicate_verticales = verticale_slugs.tally.select { |_slug, count| count > 1 }.keys
duplicate_verticales.each { |slug| errors << "verticale duplicate slug: #{slug}" }

verticales.each do |verticale|
  slug = verticale["slug"]
  label = verticale["label"]
  status = verticale["status"] || (verticale["planned"] ? "planned" : "active")

  %w[slug label permalink description positioning keywords].each do |field|
    value = verticale[field]
    errors << "#{slug || label || "(unknown)"} missing #{field}" if value.nil? || value == "" || value == []
  end

  unless %w[active planned archived].include?(status)
    errors << "#{slug} has invalid status #{status.inspect}; expected active, planned or archived"
  end

  if status == "active"
    errors << "#{slug} active verticale must set visible_footer: true" unless verticale["visible_footer"] == true
    errors << "#{slug} active verticale must set include_home: true or false" unless [true, false].include?(verticale["include_home"])
    errors << "#{slug} active verticale must set include_llms: true or false" unless [true, false].include?(verticale["include_llms"])
  end

  if verticale["include_home"] == true && (verticale["home_description"].nil? || verticale["home_description"].empty?)
    errors << "#{slug} include_home requires home_description"
  end

  if verticale["include_llms"] == true && (verticale["llms_description"].nil? || verticale["llms_description"].empty?)
    errors << "#{slug} include_llms requires llms_description"
  end

  if verticale["visible_footer"] == true && !page_exists_for?(verticale["permalink"])
    errors << "#{slug} visible_footer points to missing page #{verticale["permalink"]}"
  end
end

post_counts = Hash.new(0)

POSTS_DIR.glob("*.md").each do |post_path|
  frontmatter = frontmatter_for(post_path)
  if frontmatter["__error"]
    errors << "#{post_path.relative_path_from(ROOT)} invalid front matter: #{frontmatter["__error"]}"
    next
  end

  format = frontmatter["format"]
  verticale = frontmatter["verticale"]

  errors << "#{post_path.relative_path_from(ROOT)} unknown format #{format.inspect}" if format && !format_slugs.include?(format)
  errors << "#{post_path.relative_path_from(ROOT)} missing verticale" if verticale.nil? || verticale.empty?

  if verticale && !verticale_slugs.include?(verticale)
    errors << "#{post_path.relative_path_from(ROOT)} unknown verticale #{verticale.inspect}"
  elsif verticale
    post_counts[verticale] += 1 unless frontmatter["archive"] == true
  end
end

verticales.each do |verticale|
  next unless verticale["status"] == "active"
  next unless verticale["visible_footer"] == true

  minimum_posts = verticale["minimum_posts"] || 2
  count = post_counts[verticale["slug"]]
  if count < minimum_posts
    errors << "#{verticale["slug"]} visible active verticale has #{count} posts; expected at least #{minimum_posts}"
  end
end

fail_with(errors)

puts "Positioning check OK: #{verticales.count { |v| v["status"] == "active" }} active verticales, #{post_counts.values.sum} classified posts."
