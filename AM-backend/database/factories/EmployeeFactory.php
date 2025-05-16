<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Departments;
use App\Models\JobPosition;
use App\Models\EmployeeAddress;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    protected $model = \App\Models\Employee::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName(),
            'middle_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'suffix' => '',
            'gender' => $this->faker->randomElement(['male', 'female']),
            'dob' => $this->faker->date('Y-m-d', '-22 years'),
            'civil_status' => $this->faker->randomElement(['single', 'married']),
            'nationality' => 'Filipino',
            'phone_number' => $this->faker->phoneNumber(),
            'emergency_contact1' => $this->faker->phoneNumber(),
            'emergency_contact2' => $this->faker->phoneNumber(),
            'date_hired' => $this->faker->date(),
            'status' => 'active',
            'profile_pic_url' => null,
            'department' => Departments::inRandomOrder()->first()->name,
            'job_position' => JobPosition::inRandomOrder()->first()->name,
            'address' => EmployeeAddress::factory(),
        ];
    }
}
