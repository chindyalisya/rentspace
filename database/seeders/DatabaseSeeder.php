<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Aman dijalankan berulang (password dev: "password")
        foreach ([
            ['Admin RentSpace', 'admin@rentspace.test', true],
            ['Test User', 'test@example.com', false],
        ] as [$name, $email, $admin]) {
            User::firstOrNew(['email' => $email])->forceFill([
                'name' => $name,
                'password' => 'password',
                'email_verified_at' => now(),
                'is_admin' => $admin,
            ])->save();
        }
    }
}