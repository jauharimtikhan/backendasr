<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "id" => fake()->uuid(),
            'name' => fake()->name(),
            'description' => fake()->paragraph(),
            'price' => fake()->numberBetween(10000, 9999999),
            'discount_price' => fake()->numberBetween(1000, 99999),
            'discount_tag' => fake()->numberBetween(10, 90),
            'image' => fake()->imageUrl(),
        ];
    }
}
