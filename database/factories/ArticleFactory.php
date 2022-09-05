<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
          'preview' => $this->faker->imageUrl(),
          'title' => $this->faker->unique()->sentence(),
          'description' => $this->faker->text(),
          'content' => $this->faker->paragraph(6),          
          'user_id' => $this->faker->numberBetween(4, 5),
        ];
    }
}
