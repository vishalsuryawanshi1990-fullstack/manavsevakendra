#!/usr/bin/env bash
# Runs on the server (via SSH from the GitHub Actions deploy workflow) to
# install PHP deps and run migrations/caches for the Laravel backend. The
# caller is expected to have already cloned/updated $REPO_PATH to the
# latest commit before invoking this script — it must NOT git-pull itself,
# since bash keeps executing the buffered old copy of a running script even
# after the underlying file changes on disk.
#
# The Next.js frontend deploys separately and automatically through
# Hostinger's own git-connected app hosting, so this script only handles
# the Laravel backend.
set -euo pipefail

REPO_PATH="${REPO_PATH:-$HOME/manavsevakendra}"

# The account's default `php`/`composer` on PATH can resolve to an older
# version (e.g. 8.1) than what the app requires (8.3). Prefer the versioned
# CLI binary the host provides (Hostinger/cPanel-style `php83`) if present.
PHP_BIN="${PHP_BIN:-}"
if [ -z "$PHP_BIN" ]; then
  if command -v php83 >/dev/null 2>&1; then
    PHP_BIN="php83"
  elif command -v php8.3 >/dev/null 2>&1; then
    PHP_BIN="php8.3"
  else
    PHP_BIN="php"
  fi
fi
echo "Using PHP binary: $PHP_BIN ($($PHP_BIN -v | head -n1))"

cd "$REPO_PATH"

echo "==> [1/2] Backend: composer install"
"$PHP_BIN" "$(command -v composer)" install --no-dev --optimize-autoloader

echo "==> [2/2] Backend: migrate + cache"
"$PHP_BIN" artisan migrate --force
"$PHP_BIN" artisan config:cache
"$PHP_BIN" artisan route:cache
"$PHP_BIN" artisan view:cache
"$PHP_BIN" artisan storage:link || true

echo "Deploy complete"
