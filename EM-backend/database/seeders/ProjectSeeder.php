<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::insert([
            [
                'name' => 'Project BOUQUET',
                'description' => 'Business Optimization Using Quality & Efficient Technologies',
                'start_date' => '2025-05-10',
                'end_date' => '2026-05-10',
            ]
        ]);
    }
}
