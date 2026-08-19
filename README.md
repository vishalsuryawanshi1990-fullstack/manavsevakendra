# मानव सेवा केंद्र — Manav Seva Kendra

Website for Manav Seva Kendra (मावळ, पुणे), covering its four institutions — School of Economics, Computer
Science & IT, School of Psychology, and the Library & Research Center — plus a pixel-faithful आजीव सदस्यत्व
(life membership) form and a general देणगी (donation) form, both wired to real Razorpay payments, a database,
and a Laravel-based admin panel for managing registrations, site content, and payment settings.

- Frontend: **Next.js 15 (App Router, Server Components) + React + TypeScript + Tailwind CSS + Framer Motion**
- Backend: **Laravel 13 (PHP)** — public REST API + a server-rendered `/admin` panel
- Payments: **Razorpay** (Orders API + signature verification)
- Marathi content set with Noto Sans Devanagari, fully responsive

## Workspace structure

- `/frontend` — Next.js public website
- `/` (repo root) — Laravel backend: public API (`routes/api.php`), admin panel (`routes/web.php` under
  `/admin`, `resources/views/admin/`), migrations, models, seeders
- `/Backend`, `backend.csproj` — an earlier ASP.NET Core scaffold; **not used** by the current site

## 1. Run the frontend (development)

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`. The homepage is a Server Component that fetches site content from the Laravel
`/api/cms` and `/api/settings` endpoints at request time (revalidated every 30s) — if the backend isn't
running, it falls back to sensible defaults so the site still renders.

## 2. Run the frontend (production build — the actual "build" to test)

```bash
cd frontend
npm install
npm run build   # creates the optimized production build in .next/
npm run start   # serves that exact build at http://localhost:3000
```

## 3. Run the Laravel backend (development)

From the repo root (not `/frontend`):

```bash
composer install
cp .env.example .env          # skip if .env already exists
php artisan key:generate
touch database/database.sqlite  # skip if it already exists
php artisan migrate
php artisan db:seed             # creates the admin account + seeds CMS content and settings
php artisan storage:link        # so uploaded photos are web-accessible
php artisan serve --port=8000
```

The API is live at `http://localhost:8000`; the admin panel is at `http://localhost:8000/admin`.

**Admin login:** set `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` before running `db:seed` — otherwise it seeds
`admin@manavsevakendra.local` with an insecure default password (fine for local dev only, **change before
deploying**). Re-run `php artisan db:seed --class=AdminUserSeeder` after changing `.env` to update it.

## 4. Set up Razorpay (required for payments to actually work)

1. Get your **Key ID** and **Key Secret** from the Razorpay dashboard (Settings → API Keys). Test-mode keys
   work fine for development.
2. Add them to `.env`:
   ```
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
   ```
3. Restart `php artisan serve`. `GET /api/settings` will now report `"razorpay_enabled": true`, and both
   registration forms will open the Razorpay checkout after saving the applicant's details.

Without real keys, both forms still work — they save the registration and skip straight to a success message,
with a note that the office will follow up about payment.

## 5. Deploying the backend to a server

```bash
composer install --no-dev --optimize-autoloader
cp .env.example .env
php artisan key:generate
# set DB_CONNECTION / DB_HOST / DB_DATABASE / DB_USERNAME / DB_PASSWORD for your production DB
# set CORS_ALLOWED_ORIGINS to your deployed frontend's URL (comma-separated for multiple)
# set ADMIN_EMAIL / ADMIN_PASSWORD to real credentials
# set RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET to your live keys
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
```

On the frontend, set `NEXT_PUBLIC_API_BASE_URL` (in `frontend/.env.local` or your hosting provider's env vars)
to your deployed API's base URL, e.g. `https://api.yourdomain.com/api`, then rebuild.

## CI/CD (GitHub Actions)

`.github/workflows/ci.yml` defines three jobs:

- **backend** — installs PHP deps, runs migrations against a throwaway sqlite DB, runs `php artisan test`
- **frontend** — installs Node deps, runs `npm run build`
- **deploy** — only on a push to `main`, and only if both jobs above pass: SSHes into the server, ensures
  `DEPLOY_APP_PATH` is a git checkout of this repo on `main` (initializing it in place on first run — it
  does **not** require the directory to be empty beforehand), then runs `deploy/deploy.sh`, which installs
  PHP deps and runs migrations/caches for the **Laravel backend only**.

  The Next.js frontend is **not** deployed by this pipeline — it's served separately through Hostinger's own
  git-connected app hosting, which rebuilds automatically on every push to `main` independently of this
  workflow.

CI (the first two jobs) runs on every push and PR automatically — nothing to configure. **Deploy is gated
behind GitHub Secrets** that don't exist yet; until you add them, the `deploy` job fails at the SSH step with
a "missing server host" error (safe — it doesn't affect the other two jobs).

### One-time setup to enable auto-deploy

1. **Add these secrets** in your GitHub repo → Settings → Secrets and variables → Actions → New repository
   secret:

   | Secret name | Value |
   |---|---|
   | `DEPLOY_HOST` | your server's hostname or IP |
   | `DEPLOY_USER` | your SSH/cPanel username |
   | `DEPLOY_PASSWORD` | your SSH/cPanel password |
   | `DEPLOY_PORT` | SSH port, only if not 22 |
   | `DEPLOY_APP_PATH` | absolute path to the Laravel app's document root on the server, e.g. `/home/<user>/domains/api.yourdomain.com/laravel` |

   If you have an SSH key instead of a password, swap the `password:` input in the `deploy` job for `key:
   ${{ secrets.DEPLOY_SSH_KEY }}` and add that secret instead — keys are preferred where available.

2. **Make sure `DEPLOY_APP_PATH` is the actual document root your web server serves `api.yourdomain.com`
   from** (check this in your hosting panel — the domain/subdomain's "Document Root" or "Application root"
   setting). The pipeline will happily deploy a perfectly working Laravel app to the wrong folder if this
   doesn't match, and every request will keep 404ing.

3. **Configure `.env` directly on the server**, at `$DEPLOY_APP_PATH/.env` — it's gitignored, so the pipeline
   never creates, uploads, or overwrites it. Set `DB_*`, `APP_KEY` (`php artisan key:generate` once),
   `ADMIN_EMAIL`/`ADMIN_PASSWORD`, `CORS_ALLOWED_ORIGINS` (your real frontend domain, not `localhost`), and
   Razorpay keys if using payments.

4. Push to `main`. The `deploy` job will show up in the **Actions** tab. On the very first run it clones the
   repo into `DEPLOY_APP_PATH` (in place — any existing untracked files there, like an old `.env`, are left
   alone); on every run after, it fetches and hard-resets to `origin/main`.

5. **Create the admin login once** — the deploy pipeline deliberately never runs `php artisan db:seed`
   (it would silently overwrite any CMS content you've since edited through `/admin/cms` on every deploy).
   After the first successful deploy, SSH/panel-terminal in and run:
   ```bash
   cd "$DEPLOY_APP_PATH"
   php artisan db:seed --class=AdminUserSeeder --force
   ```

If the account's default `php`/`composer` on `PATH` resolve to an older version than the app needs,
`deploy.sh` auto-detects and prefers a versioned `php83`/`php8.3` binary if one exists; override with a
`PHP_BIN` env var if your host names it differently.

## Admin panel (`/admin`)

- **डॅशबोर्ड** — counts by registration type/payment status and amount collected
- **नोंदणी अर्ज** — full CRUD on submissions: filter/search, view every field (including uploaded photo),
  and update office-only fields (status, member number, receipt number, board resolution, etc.); deletable
- **वेबसाईट CMS** — edit the JSON behind every repeatable homepage section (institutions, stats, journey,
  floor plans, facilities, gallery, FAQ, ...) — changes appear on the site within ~30 seconds, no redeploy
- **सेटिंग्स व पेमेंट** — edit the life-membership fee package, suggested donation amounts, hero/mission text,
  and organization address/registration numbers. Razorpay keys are intentionally **not** editable here — they
  stay in `.env` only, so they're never exposed through a web form.

## The two registration forms

Both are the same pixel-faithful paper-form recreation (`frontend/components/MembershipFormExact.tsx`),
parameterized by a `variant` prop:

- **आजीव सदस्यत्व अर्ज** (`#membership`) — fixed fee, read from `settings.life_membership_amount`
  (admin-editable, defaults to ₹10,000). The amount is **never trusted from the client** — even if someone
  tampers with the request, the backend always charges the admin-configured fee for this type.
- **देणगी नोंदणी अर्ज** (`#donation`) — same form, but the applicant picks any amount (quick-select buttons
  from `settings.donation_suggested_amounts`, or a custom figure).

On submit: the backend saves the registration, then (if Razorpay is configured) creates a Razorpay order and
returns it to the browser, which opens Razorpay's checkout. On successful payment, the signature is verified
**server-side** (`POST /api/payments/verify`) before the registration is marked `paid` — the frontend alone
can never mark a payment as successful.

## Notes / known gaps

- The logo, building illustration, and campus illustrations are hand-recreated SVGs; the home banner uses
  your real campus master-plan image (`frontend/public/images/home-banner.png`).
- No admin roles/permissions beyond a single `is_admin` flag — every admin account can do everything.
- The office-use section on the public forms is shown (for visual fidelity with the paper form) but disabled
  — applicants can't self-approve membership.
- Verified locally end-to-end: migrations + seeders run cleanly, `npm run build` compiles with and without
  the backend running (graceful fallback), admin login/CRUD/CMS/settings all work over a real session, and a
  full registration submission (both types) saves correctly with server-side amount enforcement — confirmed
  by deliberately sending a tampered `amount=1` for a life-membership submission and seeing the backend
  override it to the configured ₹10,000.
