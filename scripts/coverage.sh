#!/usr/bin/env bash
set -e

ROOT_DIR=$(cd $(dirname $0)/..; pwd)
cd $ROOT_DIR

PACKAGE="$1"
GLOB=$([ -n "$PACKAGE" ] && echo "$PACKAGE" || echo "*")

# 1. Build
BABEL_ENV=nyc ./scripts/build.sh "$1"

# 2. Coverage
nyc mocha "./packages/$GLOB/test/index.js" \
  --opts .mocha.opts
