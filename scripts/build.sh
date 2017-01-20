#!/usr/bin/env bash
set -e

ROOT_DIR=$(cd $(dirname $0)/..; pwd)
cd $ROOT_DIR

PACKAGE="$1"

for D in ./packages/poosh*; do
  if [ ! -d "${D}/src" ]; then
    continue
  fi

  if [ -n "$PACKAGE" ] && [ `basename $D` != "$PACKAGE" ]; then
    continue
  fi

  echo "Building $D..."

  # Clean
  rm -rf "${D}/lib"

  # Build
  babel "${D}/src" \
    --out-dir "${D}/lib" \
    --quiet

done
