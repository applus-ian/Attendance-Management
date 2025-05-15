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
            'dept_id' => Departments::factory(),
            'job_position_id' => JobPosition::factory(),
            'address_id' => EmployeeAddress::factory(),
            'first_name' => $this->faker->firstName,
            'middle_name' => $this->faker->optional()->lastName,
            'last_name' => $this->faker->lastName,
            'suffix' => $this->faker->optional()->suffix,
            'email' => $this->faker->unique()->safeEmail,
            'gender' => $this->faker->randomElement(['male', 'female']),
            'dob' => $this->faker->date('Y-m-d', '-18 years'),
            'civil_status' => $this->faker->randomElement(['single', 'married', 'divorced', 'widowed']),
            'nationality' => $this->faker->country,
            'phone_number' => $this->faker->phoneNumber,
            'emergency_contact1' => $this->faker->phoneNumber,
            'emergency_contact2' => $this->faker->optional()->phoneNumber,
            'date_hired' => $this->faker->date('Y-m-d', '-5 years'),
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'profile_pic_url' => $this->faker->optional()->imageUrl(),
        ];
    }
}
