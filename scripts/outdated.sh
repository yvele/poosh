#!/usr/bin/env bash
set -e

ROOT_DIR=$(cd $(dirname $0)/..; pwd)
cd $ROOT_DIR

echo ""
echo "----> ./"
npm outdated --long

for D in ./packages/poosh*/; do

  echo ""
  echo "----> ${D}"
  cd "$ROOT_DIR/${D}"
  npm outdated --long

done