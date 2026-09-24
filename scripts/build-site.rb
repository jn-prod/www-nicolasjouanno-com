#!/usr/bin/env ruby
# frozen_string_literal: true

# Les sources Markdown référencent les photos locales pour rester visibles dans
# les éditeurs : ![Description](../images/posts/photo.jpg).
#
# Jekyll est exécuté en mode sûr et ne charge donc pas de plugin local. Ce
# pré-build remplace temporairement ces URL par leur dérivé WebP, le temps de
# générer _site, puis restaure exactement les fichiers source.
require "pathname"

ROOT = Pathname.new(__dir__).join("..").expand_path
MARKDOWN_DIRECTORIES = %w[_posts _drafts].freeze
SOURCE_IMAGE_PATTERN = %r{
  (?<opening>!\[[^\]]*\]\()
  (?:(?:\.\./)+|\./|/)?images/
  (?<path>[^)\s?#]+?)\.(?:jpe?g|png)
  (?<suffix>[?#][^)]*)?
  (?<closing>\))
}ix.freeze

def publication_content(content)
  content.gsub(SOURCE_IMAGE_PATTERN) do
    "#{Regexp.last_match[:opening]}/images/#{Regexp.last_match[:path]}.webp" \
      "#{Regexp.last_match[:suffix]}#{Regexp.last_match[:closing]}"
  end
end

originals = {}

begin
  MARKDOWN_DIRECTORIES.each do |directory|
    ROOT.join(directory).glob("**/*.md").each do |path|
      content = path.read
      published = publication_content(content)
      next if published == content

      originals[path] = content
      path.write(published)
    end
  end

  jekyll_arguments = ARGV.reject { |argument| argument == "--" }
  abort "Jekyll build failed." unless system("bundle", "exec", "jekyll", "build", *jekyll_arguments)
ensure
  originals.each { |path, content| path.write(content) }
end
