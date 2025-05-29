<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobPosition;

class JobPositionSeeder extends Seeder
{
    public function run(): void
    {
        JobPosition::create(['title' => 'Manager']);
        JobPosition::create(['title' => 'Engineer']);
        JobPosition::create(['title' => 'HR Specialist']);
        JobPosition::create(['title' => 'Admin Staff']);
        JobPosition::create(['title' => 'IT Support']);
    }
}
