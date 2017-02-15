#!/usr/bin/env bash
set -e

ROOT_DIR=$(cd $(dirname $0)/..; pwd)
cd $ROOT_DIR

# 1. Installation
npm install
lerna bootstrap

# 2. Eslint rules
npm run build -- eslint-config-poosh
cd $ROOT_DIR/packages/eslint-config-poosh
npm link

cd $ROOT_DIR
npm link eslint-config-poosh
