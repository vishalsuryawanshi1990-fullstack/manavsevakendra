<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Copy of ../laravel/public/index.php, adjusted for a host where the
// document root (public_html) is fixed and can't be pointed at the app's
// public/ folder directly. deploy.sh syncs the rest of public/ alongside
// this file on every deploy; keep the two in sync if upgrading Laravel
// changes the upstream index.php.
$appDir = __DIR__.'/../laravel';

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = $appDir.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require $appDir.'/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once $appDir.'/bootstrap/app.php';

$app->handleRequest(Request::capture());
