<?php

namespace Database\Seeders;

use App\Models\TeamAssign;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamAssignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TeamAssign::insert([
            'name' => 'Team Bangan',
        ]);
    }
}
