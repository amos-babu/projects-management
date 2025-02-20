<?php

namespace Database\Seeders;

use App\Enums\UserRoles;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(30)->create();
        Project::factory(30)->create();
        Task::factory(30)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@example.com',
            'role' => UserRoles::ADMIN->value,
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'name' => 'Test Manager',
            'email' => 'manager@example.com',
            'role' => UserRoles::MANAGER->value,
            'password' => bcrypt('password'),
        ]);
    }
}
