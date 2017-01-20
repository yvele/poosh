#!/usr/bin/env bash
set -e

ROOT_DIR=$(cd $(dirname $0)/..; pwd)
cd $ROOT_DIR

# Clean Istanbul Coverage Report
rm -rf ./coverage
rm -rf ./.nyc_output
