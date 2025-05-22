<?php

namespace Database\Seeders;

use App\Models\EmployeeProject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EmployeeProject::insert([
            [
                'employee_id' => 1,
                'project_id' => 1,
                'project_role_id' => 1,
                'start_date' => '2025-05-10',
                'end_date' => '2026-05-10',
            ]
        ]);
    }
}
