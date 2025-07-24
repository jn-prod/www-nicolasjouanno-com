#!/bin/sh
rm -rf ./dist
cp -R ./www/_site/ ./dist
rm ./dist/package.json
rm ./dist/CHANGELOG.md