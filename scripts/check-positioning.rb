#!/usr/bin/env ruby
# frozen_string_literal: true

require "date"
require "find"
require "pathname"
require "yaml"

ROOT = Pathname.new(__dir__).join("..").expand_path
POSTS_DIR = ROOT.join("_posts")
SKIPPED_DIRECTORIES = %w[
  .git
  _drafts
  _posts
  _site
  _templates
  docs
  images
  images-dist
  node_modules
  packages
  www
].freeze
LEGACY_KEYS = %w[format verticale sous_silo categories].freeze

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

def taxonomy_pages
  pages = []

  Find.find(ROOT.to_s) do |entry|
    relative = Pathname.new(entry).relative_path_from(ROOT)
    if File.directory?(entry)
      dirname = relative.basename.to_s
      Find.prune if SKIPPED_DIRECTORIES.include?(dirname) || dirname.start_with?("_")
      next
    end
    next unless File.extname(entry) == ".md"

    frontmatter = frontmatter_for(Pathname.new(entry))
    next if frontmatter.empty? || frontmatter["__error"]

    pages << { path: relative, frontmatter: frontmatter }
  end

  pages
end

errors = []
category_pages = {}
tag_pages = {}

taxonomy_pages.each do |page|
  path = page.fetch(:path)
  frontmatter = page.fetch(:frontmatter)
  category = frontmatter["category"]
  tag = frontmatter["tag"]

  if category && tag
    errors << "#{path} cannot declare both category and tag"
    next
  end
  next unless category || tag

  %w[label].each do |field|
    errors << "#{path} missing #{field}" if frontmatter[field].to_s.strip.empty?
  end

  index = category ? category_pages : tag_pages
  slug = category || tag
  if index.key?(slug)
    errors << "duplicate taxonomy page for #{slug.inspect}: #{index[slug][:path]} and #{path}"
  else
    index[slug] = page
  end
end

errors << "no category pages found" if category_pages.empty?
errors << "no tag pages found" if tag_pages.empty?

post_counts_by_category = Hash.new(0)
post_counts_by_tag = Hash.new(0)

POSTS_DIR.glob("*.md").each do |post_path|
  relative_path = post_path.relative_path_from(ROOT)
  frontmatter = frontmatter_for(post_path)
  if frontmatter["__error"]
    errors << "#{relative_path} invalid front matter: #{frontmatter["__error"]}"
    next
  end

  errors << "#{relative_path} missing title" if frontmatter["title"].to_s.strip.empty?
  LEGACY_KEYS.each do |key|
    errors << "#{relative_path} still uses legacy key #{key}" if frontmatter.key?(key)
  end

  category = frontmatter["category"]
  if !category.is_a?(String) || category.empty?
    errors << "#{relative_path} must have exactly one category"
  elsif !category_pages.key?(category)
    errors << "#{relative_path} has no category page for #{category.inspect}"
  else
    post_counts_by_category[category] += 1
  end

  tags = Array(frontmatter["tags"]).map(&:to_s)
  errors << "#{relative_path} must have at least one tag" if tags.empty?
  errors << "#{relative_path} has duplicate tags" if tags.uniq.length != tags.length
  errors << "#{relative_path} has tags that are not lowercase" if tags.any? { |tag| tag != tag.downcase }
  tag_pages.each_key do |tag|
    post_counts_by_tag[tag] += 1 if tags.include?(tag) && frontmatter["archive"] != true
  end

  if category == "actu" && frontmatter["archive"] != true
    errors << "#{relative_path} category actu must set archive: true"
  elsif category != "actu" && frontmatter["archive"] == true
    errors << "#{relative_path} archived post must use category actu"
  end
end

category_pages.each_key do |category|
  errors << "#{category} category has no posts" if post_counts_by_category[category].zero?
end

tag_pages.each do |tag, page|
  minimum_posts = page.fetch(:frontmatter)["minimum_posts"] || 1
  count = post_counts_by_tag[tag]
  if count < minimum_posts
    errors << "#{tag} tag has #{count} visible posts; expected at least #{minimum_posts}"
  end
end

fail_with(errors)

puts "Positioning check OK: #{POSTS_DIR.glob("*.md").size} posts, #{category_pages.size} category pages, #{tag_pages.size} tag pages."
