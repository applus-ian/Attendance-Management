<?php

namespace Database\Factories;

use App\Models\Schedules;
use Illuminate\Database\Eloquent\Factories\Factory;

class SchedulesFactory extends Factory
{
    protected $model = Schedules::class;

    public function definition()
    {
        return [
            'title' => $this->faker->title(),
            'sched_start' => $this->faker->time(),
            'sched_end' => $this->faker->time(),
            'sched_break' => $this->faker->numberBetween(0, 120),
            'day' => $this->faker->dayOfWeek(),
            'num_assigned' => $this->faker->numberBetween(0, 100),
        ];
    }
}
