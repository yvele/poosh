#!/usr/bin/env bash
set -e

ROOT_DIR=$(cd $(dirname $0)/..; pwd)
cd $ROOT_DIR

PACKAGE="$1"
GLOB=$([ -n "$PACKAGE" ] && echo "$PACKAGE" || echo "*")

# Build
BABEL_ENV=test ./scripts/build.sh sourcemaps "$1"

istanbul cover _mocha -- "./packages/$GLOB/test/index.js" --opts .mocha.opts
