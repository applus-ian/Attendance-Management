<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Departments>
 */
class DepartmentsFactory extends Factory
{
    protected $model = \App\Models\Departments::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            // 'manager_id' => Employee::factory(),
        ];
    }
}
