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
# `category` et `sitemap` viennent des valeurs par défaut de _config.yml, selon le dossier.
LEGACY_KEYS = %w[archive categories category format sitemap sous_silo verticale].freeze
# Un seul tag par post, pour « À lire ensuite », jamais affiché.
ALLOWED_POST_TAGS = %w[outdoor work nutrition].freeze
# `post` : _posts/, listé par /posts.html ; `archive` : _posts/archive/, sa page, en noindex.
CATEGORIES = %w[post archive].freeze

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
    next unless %w[.md .html].include?(File.extname(entry))

    frontmatter = frontmatter_for(Pathname.new(entry))
    next if frontmatter.empty? || frontmatter["__error"]

    pages << { path: relative, frontmatter: frontmatter }
  end

  pages
end

errors = []
category_pages = {}

taxonomy_pages.each do |page|
  path = page.fetch(:path)
  frontmatter = page.fetch(:frontmatter)
  errors << "#{path} still declares a tag page (tag:)" if frontmatter.key?("tag")
  category = frontmatter["category"]
  next unless category

  index = category_pages
  slug = category
  if index.key?(slug)
    errors << "duplicate taxonomy page for #{slug.inspect}: #{index[slug][:path]} and #{path}"
  else
    index[slug] = page
  end
end

errors << "no category pages found" if category_pages.empty?

post_counts_by_category = Hash.new(0)
post_paths = POSTS_DIR.glob("**/*.md")

post_paths.each do |post_path|
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

  folder = post_path.dirname.relative_path_from(POSTS_DIR).to_s
  category = folder == "." ? "post" : folder
  if !CATEGORIES.include?(category)
    errors << "#{relative_path} must be in _posts/ or _posts/#{(CATEGORIES - ["post"]).join(', _posts/')}/"
  elsif category != "post" && !category_pages.key?(category)
    errors << "#{relative_path} has no category page for #{category.inspect}"
  else
    post_counts_by_category[category] += 1
  end

  tags = Array(frontmatter["tags"]).map(&:to_s)
  errors << "#{relative_path} must have exactly one tag" unless tags.length == 1
  invalid_tags = tags - ALLOWED_POST_TAGS
  errors << "#{relative_path} uses unapproved tags: #{invalid_tags.join(', ')}" unless invalid_tags.empty?
end

category_pages.each_key do |category|
  count = post_counts_by_category[category]
  if count.zero?
    errors << "#{category} category has no posts"
  end
end

fail_with(errors)

puts "Positioning check OK: #{post_paths.size} posts, #{category_pages.size} category pages."
