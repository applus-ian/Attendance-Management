<?php

namespace Database\Factories;

use App\Models\AssignedSchedules;
use Illuminate\Database\Eloquent\Factories\Factory;

class AssignedSchedulesFactory extends Factory
{
    protected $model = AssignedSchedules::class;

    public function definition()
    {
        return [
            'emp_id' => $this->faker->randomNumber(),
            'sched_id' => $this->faker->randomNumber(),
            'assigned_at' => $this->faker->dateTime(),
        ];
    }
}
