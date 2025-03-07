<?php

namespace Database\Factories;

use App\Enums\ProjectsStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description' => fake()->sentence(),
            'user_id' => fake()->numberBetween(1, 30),
            'status' => fake()->randomElement(array_column(ProjectsStatus::cases(), 'value')),
            'start_date' => fake()->date(),
            'manager_assigned_id' => fake()->numberBetween(1, 30),
            'end_date' => fake()->date(),
        ];
    }
}
