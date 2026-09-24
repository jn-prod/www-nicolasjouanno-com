#!/usr/bin/env ruby
# frozen_string_literal: true

# Le contenu, le front matter et les réglages locaux référencent les images
# sources pour rester lisibles dans les éditeurs : ../images/posts/photo.jpg.
#
# Jekyll est exécuté en mode sûr et ne charge donc pas de plugin local. Ce
# pré-build remplace temporairement ces URL par leur dérivé WebP, le temps de
# générer _site, puis restaure exactement les fichiers source.
require "pathname"

ROOT = Pathname.new(__dir__).join("..").expand_path
MARKDOWN_DIRECTORIES = %w[_posts _drafts].freeze
SOURCE_FILES = %w[_config.yml index.md _layouts/default.html].freeze
SOURCE_IMAGE_PATTERN = %r{
  (?<![A-Za-z0-9._-])
  (?:(?:\.\./)+|\./|/)?images/
  (?<path>[^)\s?#]+?)\.(?:jpe?g|png)
  (?<suffix>[?#][^)]*)?
}ix.freeze

def publication_content(content)
  content.gsub(SOURCE_IMAGE_PATTERN) do
    "/images/#{Regexp.last_match[:path]}.webp#{Regexp.last_match[:suffix]}"
  end
end

originals = {}

begin
  paths = SOURCE_FILES.map { |file| ROOT.join(file) }
  paths.concat(MARKDOWN_DIRECTORIES.flat_map { |directory| ROOT.join(directory).glob("**/*.md") })

  paths.each do |path|
    content = path.read
    published = publication_content(content)
    next if published == content

    originals[path] = content
    path.write(published)
  end

  jekyll_arguments = ARGV.reject { |argument| argument == "--" }
  abort "Jekyll build failed." unless system("bundle", "exec", "jekyll", "build", *jekyll_arguments)
ensure
  originals.each { |path, content| path.write(content) }
end
