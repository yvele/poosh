#!/usr/bin/env bash
set -e

ROOT_DIR=$(cd $(dirname $0)/..; pwd)
cd $ROOT_DIR

# Clean NPM
rm -rf ./npm-debug*
rm -rf ./node_modules
rm -rf ./packages/*/npm-debug*
rm -rf ./packages/*/node_modules
