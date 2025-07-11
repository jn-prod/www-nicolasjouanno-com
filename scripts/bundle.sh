#!/bin/sh
rm -rf ./dist
cp -R ./site/www/_site/ ./dist
rm ./dist/package.json
rm ./dist/CHANGELOG.md