<?php

namespace Database\Seeders;

use App\Models\SkillCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SkillCategory::insert([
            ['name' => 'Technical'],
            ['name' => 'Leadership'],
            ['name' => 'Functional'],
        ]);
    }
}
