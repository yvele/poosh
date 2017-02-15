#!/usr/bin/env bash
set -e

ROOT_DIR=$(cd $(dirname $0)/..; pwd)
cd $ROOT_DIR

# 1. Src
eslint ./packages/*/src/**

# 2. Test
eslint -c ./node_modules/eslint-config-poosh/mocha.js \
  ./packages/*/test/**
