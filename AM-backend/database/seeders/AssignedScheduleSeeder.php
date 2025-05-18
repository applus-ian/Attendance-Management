<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AssignedSchedules;

class AssignedScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AssignedSchedules::create([
            'emp_id' => 1,
            'sched_id' => 1,
            'assigned_at' => null
        ]);
    }
}
