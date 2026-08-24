#!/bin/sh
set -eu

ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

echo "Removing node_modules from ${ROOT} (root, apps, libs)..."

removed=0

if [ -d "${ROOT}/node_modules" ]; then
  rm -rf "${ROOT}/node_modules"
  echo "Removed ${ROOT}/node_modules"
  removed=1
fi

for dir in apps libs; do
  if [ ! -d "${ROOT}/${dir}" ]; then
    continue
  fi

  find "${ROOT}/${dir}" -type d -name node_modules -prune -exec rm -rf '{}' \; -exec echo "Removed {}" \;
  # Note: find's -exec does not give us an easy portable way to update $removed.
done

if [ "${removed}" -eq 0 ]; then
  echo "Done."
else
  echo "Done."
fi
