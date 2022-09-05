<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
      return [
        'message' => $this->faker->paragraph(4),
        'commentable_type' => $this->faker->randomElement(['App\Models\Post', 'App\Models\Article']),
        'commentable_id' => $this->faker->numberBetween(1,15),
        'user_id' => $this->faker->numberBetween(1,6),
      ];
    }
}
