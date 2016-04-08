#!/usr/bin/env bash
set -e

ROOT_DIR=$(cd $(dirname $0)/..; pwd)

# 1. Bootstrap main
npm link eslint-config-poosh
npm install

# 2. Boostrap packages
#lerna bootstrap
#lerna is not used because:
# - https://github.com/kittens/lerna/issues/93
# - https://github.com/kittens/lerna/issues/78

cd $ROOT_DIR/packages/eslint-config-poosh
npm link

cd $ROOT_DIR/packages/poosh-common
npm link

cd $ROOT_DIR/packages/poosh-core
npm link poosh-common
npm link

cd $ROOT_DIR/packages/poosh-cli
npm link poosh-common
npm link poosh-core
npm link

cd $ROOT_DIR/packages/poosh-plugin-s3
npm link poosh-common
npm link

cd $ROOT_DIR/packages/poosh-plugin-header-location-from-html
npm link
