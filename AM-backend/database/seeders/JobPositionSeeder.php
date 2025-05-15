<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobPosition;

class JobPositionSeeder extends Seeder
{
    public function run(): void
    {
        JobPosition::factory()->create([
            'title' => 'Manager'
        ]);
    }
}
