<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Skill::insert([
            [
                'name' => 'Programming',
                'description' => 'PHP, JavaScript, Python',
                'skill_category_id' => 1,
            ],
            [
                'name' => 'Team Management',
                'description' => 'Guiding a team to achieve goals through coordination, motivation, performance monitoring, and effective communication.',
                'skill_category_id' => 2,
            ],
            [
                'name' => 'Project Management',
                'description' => 'Planning, executing, and completing projects',
                'skillcategory_id' => 3,
            ],
        ]);
    }
}
