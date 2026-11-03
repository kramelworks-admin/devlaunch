#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==> Pulling updated images"
sudo -n docker compose pull

echo "==> Updating services"
sudo -n docker compose up -d --remove-orphans

echo "==> Checking containers"
sudo -n docker compose ps

echo "==> Checking main endpoint"
curl --fail --silent --show-error http://localhost/

echo
echo "==> Checking upstream endpoint"
curl --fail --silent --show-error http://localhost/upstream

echo
echo "==> Checking upstream info endpoint"
curl --fail --silent --show-error http://localhost/upstream/info

echo
echo "==> Deploy completed"
