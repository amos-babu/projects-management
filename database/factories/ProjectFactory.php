<?php

namespace Database\Factories;

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
            'status' => fake()->randomElement(['pending', 'In Progress', 'Completed']),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
        ];
    }
}
