<?php

use App\Http\Controllers\Api\CmsController;
use App\Http\Controllers\Api\MembershipApplicationController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\SettingsController;
use Illuminate\Support\Facades\Route;

Route::post('/membership-applications', [MembershipApplicationController::class, 'store']);
Route::post('/payments/verify', [PaymentController::class, 'verify']);
Route::get('/settings', [SettingsController::class, 'index']);
Route::get('/cms', [CmsController::class, 'index']);
