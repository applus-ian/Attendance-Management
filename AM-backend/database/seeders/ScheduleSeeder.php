<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Schedules;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schedules::create([
            'title' => 'Team A Schedule',
            'start' => '22:00:00',
            'end' => '24:00:00',
            'day' => 'wednesday',
            'num_assigned' => 1,
        ]);
    }
}
