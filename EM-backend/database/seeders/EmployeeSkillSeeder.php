<?php

namespace Database\Seeders;

use App\Models\EmployeeSkill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EmployeeSkill::insert([
            ['employee_id' => 1, 'skill_id' => 1, 'years_of_experience' => 3],
            ['employee_id' => 1, 'skill_id' => 2, 'years_of_experience' => 4],
            ['employee_id' => 1, 'skill_id' => 3, 'years_of_experience' => 5],
        ]);
    }
}
