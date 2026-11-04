
#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

COMPOSE=(
  sudo -n docker compose
  --env-file "$SCRIPT_DIR/.env.production.example"
  -f "$SCRIPT_DIR/compose.yaml"
)

echo "==> Pulling updated images"
"${COMPOSE[@]}" pull

echo "==> Updating services"
"${COMPOSE[@]}" up -d --remove-orphans

echo "==> Checking containers"
"${COMPOSE[@]}" ps

check_endpoint() {
  local url="$1"

  echo "==> Checking $url"

  for attempt in $(seq 1 30); do
    if curl --fail --silent --show-error --max-time 5 "$url" 2>/dev/null; then
      echo
      return 0
    fi

    echo "Waiting for endpoint... ($attempt/30)"
    sleep 2
  done

  echo "ERROR: Endpoint did not become ready: $url" >&2
  return 1
}

check_endpoint http://localhost/
check_endpoint http://localhost/upstream
check_endpoint http://localhost/upstream/info

echo
echo "==> Deploy completed"
