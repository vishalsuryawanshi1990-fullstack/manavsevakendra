#!/usr/bin/env bash
# Runs on the server (via SSH from the GitHub Actions deploy workflow) to
# pull the latest code and rebuild both the Laravel backend and the Next.js
# frontend. Clones the repo to $REPO_PATH on first run. Assumes a cPanel
# "Node.js App" has already been created pointing at $REPO_PATH/frontend
# with a virtualenv at $NODE_VENV.
set -euo pipefail

REPO_PATH="${REPO_PATH:-$HOME/manavsevakendra}"
REPO_URL="${REPO_URL:-https://github.com/vishalsuryawanshi1990-fullstack/manavsevakendra.git}"
NODE_VENV="${NODE_VENV:-$HOME/nodevenv/manavsevakendra/frontend/20/bin/activate}"
BRANCH="${DEPLOY_BRANCH:-main}"

echo "==> [1/6] Pulling latest code ($BRANCH)"
if [ ! -d "$REPO_PATH/.git" ]; then
  echo "    repo not found at $REPO_PATH, cloning $REPO_URL"
  git clone --branch "$BRANCH" "$REPO_URL" "$REPO_PATH"
fi
cd "$REPO_PATH"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

echo "==> [2/6] Backend: composer install"
composer install --no-dev --optimize-autoloader

echo "==> [3/6] Backend: migrate + cache"
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan storage:link || true

echo "==> [4/6] Frontend: install & build"
cd "$REPO_PATH/frontend"
if [ -f "$NODE_VENV" ]; then
  # shellcheck disable=SC1090
  source "$NODE_VENV"
fi
npm install
npm run build

echo "==> [5/6] Restarting Node app"
mkdir -p "$REPO_PATH/frontend/tmp"
touch "$REPO_PATH/frontend/tmp/restart.txt"

echo "==> [6/6] Deploy complete"
