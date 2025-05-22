<?php

namespace Database\Seeders;

use App\Models\LocationAssignment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LocationAssignment::insert([
            'job_position_id' => 1,
            'country_assign_id' => 1,
            'office_assign_id' => 1,
            'team_assign_id' => 1,
            'department_assign_id' => 1,
            'employee_id' => 1,
        ]);
    }
}
