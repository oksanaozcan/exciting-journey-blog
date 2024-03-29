<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\User;
use App\Types\RoleType;

class ModeratorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      User::create([
        'name' => 'Moderator',
        'email' => 'moderator@gmail.com',
        'email_verified_at' => now(),
        'password' => bcrypt('123456789'),
        'remember_token' => Str::random(10),
      ])->assignRole(RoleType::MODERATOR);
    }
}