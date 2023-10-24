#!/bin/sh
rm -rf ./dist
cp -R ./site/www/_site/ ./dist
cp -R ./apps/client/dist/assets/ ./dist/assets
rm ./dist/package.json
rm ./dist/CHANGELOG.md