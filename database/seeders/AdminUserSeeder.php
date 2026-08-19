<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Creates (or updates) the single admin account used to log into /admin.
     * Reads credentials from ADMIN_EMAIL / ADMIN_PASSWORD in .env (via
     * config/admin.php — set real values there before running this in
     * anything but local development. Read through config(), not env()
     * directly: once `artisan config:cache` has run, env() stops reading
     * .env at all and silently returns null, so a raw env() call here would
     * always fall back to the insecure default even with real .env values.
     */
    public function run(): void
    {
        $email = config('admin.email');
        $password = config('admin.password');

        $user = User::query()->updateOrCreate(
            ['email' => $email],
            ['name' => 'Admin', 'password' => Hash::make($password)]
        );

        $user->is_admin = true;
        $user->save();

        $this->command?->warn("Admin account ready: {$email}");
        if ($password === 'change-this-password') {
            $this->command?->warn('ADMIN_PASSWORD not set in .env — using an insecure default. Set it before deploying.');
        }
    }
}
