#!/usr/bin/env bash
set -e

ROOT_DIR=$(cd $(dirname $0)/..; pwd)
cd $ROOT_DIR

# 1. Validation
npm run validate

# 2. Building
npm run clean:build
npm run build

# 3. Publication (will bumb all packages versions + dependencies)
lerna publish --skip-git
