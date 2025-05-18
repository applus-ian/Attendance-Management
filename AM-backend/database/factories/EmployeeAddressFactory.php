<?php

namespace Database\Factories;

use App\Models\EmployeeAddress;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EmployeeAddress>
 */
class EmployeeAddressFactory extends Factory
{
    protected $model = EmployeeAddress::class;

    public function definition(): array
    {
        return [
            'province' => $this->faker->state,
            'city_or_municipality' => $this->faker->city,
            'barangay' => $this->faker->streetName,
            'street' => $this->faker->streetAddress,
            'postal_code' => $this->faker->postcode,
        ];
    }
}
