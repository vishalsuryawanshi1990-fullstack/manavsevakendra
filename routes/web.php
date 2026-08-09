<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CmsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\RegistrationController as AdminRegistrationController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;

Route::get('/', [RegistrationController::class, 'create'])->name('register.create');
Route::post('/', [RegistrationController::class, 'store'])->name('register.store');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('login', [AuthController::class, 'login'])->middleware('throttle:6,1')->name('login.attempt');

    Route::middleware(['auth', 'admin'])->group(function () {
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');

        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        Route::get('registrations', [AdminRegistrationController::class, 'index'])->name('registrations.index');
        Route::get('registrations/{registration}', [AdminRegistrationController::class, 'show'])->name('registrations.show');
        Route::put('registrations/{registration}', [AdminRegistrationController::class, 'update'])->name('registrations.update');
        Route::delete('registrations/{registration}', [AdminRegistrationController::class, 'destroy'])->name('registrations.destroy');

        Route::get('cms', [CmsController::class, 'index'])->name('cms.index');
        Route::get('cms/{section}/edit', [CmsController::class, 'edit'])->name('cms.edit');
        Route::put('cms/{section}', [CmsController::class, 'update'])->name('cms.update');

        Route::get('settings', [SettingController::class, 'edit'])->name('settings.edit');
        Route::put('settings', [SettingController::class, 'update'])->name('settings.update');
    });
});
