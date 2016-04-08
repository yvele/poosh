#!/usr/bin/env bash
set -e

ROOT_DIR=$(cd $(dirname $0)/..; pwd)
cd $ROOT_DIR

eslint ./packages/*/src/**
eslint -c ./node_modules/eslint-config-poosh/mocha.json5 \
  ./packages/*/test/**
