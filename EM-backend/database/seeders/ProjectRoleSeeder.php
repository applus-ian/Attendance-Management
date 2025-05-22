<?php

namespace Database\Seeders;

use App\Models\ProjectRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProjectRole::insert([
            ['name' => 'Project Manager'],
        ]);
    }
}
