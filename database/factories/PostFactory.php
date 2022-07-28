<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
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
          'content' => json_encode([       
            0 => [
              "text" => $this->faker->text(),       
            ],    
            1 => [
              "images" => [
                $this->faker->imageUrl(),
                $this->faker->imageUrl(),
              ],           
            ],
            2 => [
              "text" => $this->faker->text(),       
            ],             
            ]),
          'category_id' => $this->faker->numberBetween(1, 8),
        ];
    }
}
