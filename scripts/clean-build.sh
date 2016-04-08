#!/usr/bin/env bash
set -e

ROOT_DIR=$(cd $(dirname $0)/..; pwd)
cd $ROOT_DIR

# Clean Babel Build
rm -rf ./packages/*/lib
