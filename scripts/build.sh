#!/usr/bin/env bash
set -e

ROOT_DIR=$(cd $(dirname $0)/..; pwd)
cd $ROOT_DIR

SOURCE_MAP="$1"
PACKAGE="$2"

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
  if [ "$SOURCE_MAP" == "sourcemaps" ]; then
    babel "${D}/src" \
      --out-dir "${D}/lib" \
      --quiet \
      --source-maps both
  else
    babel "${D}/src" \
      --out-dir "${D}/lib" \
      --quiet
  fi

done
