<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Creates (or updates) the single admin account used to log into /admin.
     * Reads credentials from ADMIN_EMAIL / ADMIN_PASSWORD in .env — set real
     * values there before running this in anything but local development.
     */
    public function run(): void
    {
        $email = env('ADMIN_EMAIL', 'admin@manavsevakendra.local');
        $password = env('ADMIN_PASSWORD', 'change-this-password');

        $user = User::query()->updateOrCreate(
            ['email' => $email],
            ['name' => 'Admin', 'password' => Hash::make($password)]
        );

        $user->is_admin = true;
        $user->save();

        $this->command?->warn("Admin account ready: {$email}");
        if (! env('ADMIN_PASSWORD')) {
            $this->command?->warn('ADMIN_PASSWORD not set in .env — using an insecure default. Set it before deploying.');
        }
    }
}
