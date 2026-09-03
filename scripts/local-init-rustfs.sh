#!/usr/bin/env sh
# Ensure RustFS buckets exist and generate app S3 credentials for .env.
#
# Prereqs: .env with S3_BUCKET, S3_RECIPES_BUCKET, S3_AVATARS_BUCKET (and RustFS vars).
# Writes .rustfs/credentials.env once; set RUSTFS_INIT_FORCE_REGEN=1 to rotate keys.
#
# Usage:
#   pnpm docker:rustfs:init
#   sh scripts/rustfs-init.sh

set -eu

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.yaml}"

if [ ! -f "$COMPOSE_FILE" ]; then
  echo "Compose file not found: $COMPOSE_FILE" >&2
  exit 1
fi

echo "Ensuring rustfs is up ..."
docker compose -f "$COMPOSE_FILE" up -d rustfs

echo "Running rustfs-init ..."
docker compose -f "$COMPOSE_FILE" --profile rustfs-init run --rm rustfs-init

if [ -f "$ROOT/.rustfs/credentials.env" ]; then
  echo ""
  echo "Next: copy AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY from:"
  echo "  $ROOT/.rustfs/credentials.env"
  echo "into .env (use S3_ENDPOINT=http://rustfs:9000 for back in Docker, or http://127.0.0.1:9000 for local dev)."
fi
