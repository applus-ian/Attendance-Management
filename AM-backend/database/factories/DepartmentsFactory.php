<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class DepartmentFactory extends Factory
{
    public function definition(): array
    {
        $employee = Employee::inRandomOrder()->first();

        return [
            'emp_id' => $employee->emp_id,
            'manager' => "{$employee->first_name} {$employee->last_name}",
            'name' => $this->faker->unique()->company(),
        ];
    }
}
