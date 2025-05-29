<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Timesheets;
use App\Models\Employee;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Timelogs>
 */
class TimelogsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'emp_id' => Employee::inRandomOrder()->first()?->emp_id ?? 1,
            'timesheet_id' => Timesheets::inRandomOrder()->first()?->timesheet_id ?? 1,
            'timelog_type' => $this->faker->randomElement(['clock_in', 'clock_out']),
            'time' => $this->faker->dateTimeThisMonth(),
            'created_by' => 'system',
            'is_present' => $this->faker->boolean(90),
            'is_absent' => $this->faker->boolean(10),
            'is_late' => $this->faker->boolean(20),
            'hrs_worked' => $this->faker->randomFloat(2, 0, 12),
            'overtime_hrs' => $this->faker->randomFloat(2, 0, 4),
        ];
    }
}
