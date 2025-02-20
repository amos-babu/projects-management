<?php

namespace Database\Factories;

use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'description' => fake()->sentence(),
            'project_id' => fake()->numberBetween(1, 30),
            'assigned_to' => fake()->numberBetween(1, 30),
            'status' => fake()->randomElement(array_column(TaskStatus::cases(), 'value')),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
        ];
    }
}
