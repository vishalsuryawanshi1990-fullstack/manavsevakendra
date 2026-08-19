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
#
# The host's document root ($PUBLIC_HTML) is fixed by the hosting panel
# and can't be pointed at the app's public/ folder directly, so the full
# app lives at $REPO_PATH (outside the web root, keeping .env etc. safe)
# and this script publishes just the built public/ output into
# $PUBLIC_HTML on every deploy, with a path-adjusted index.php — see
# deploy/public_html/index.php.
set -euo pipefail

REPO_PATH="${REPO_PATH:-$HOME/manavsevakendra}"
PUBLIC_HTML="${PUBLIC_HTML:-$(dirname "$REPO_PATH")/public_html}"

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

echo "==> [1/3] Backend: composer install"
"$PHP_BIN" "$(command -v composer)" install --no-dev --optimize-autoloader

echo "==> [2/3] Backend: migrate + cache"
"$PHP_BIN" artisan migrate --force
"$PHP_BIN" artisan config:cache
"$PHP_BIN" artisan route:cache
"$PHP_BIN" artisan view:cache
"$PHP_BIN" artisan storage:link || true

echo "==> [3/3] Publishing to the host-fixed document root ($PUBLIC_HTML)"
mkdir -p "$PUBLIC_HTML"
if command -v rsync >/dev/null 2>&1; then
  rsync -a --exclude index.php "$REPO_PATH/public/" "$PUBLIC_HTML/"
else
  cp -a "$REPO_PATH/public/." "$PUBLIC_HTML/"
fi
cp "$REPO_PATH/deploy/public_html/index.php" "$PUBLIC_HTML/index.php"

echo "Deploy complete"
