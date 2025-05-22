<?php

namespace Database\Seeders;

use App\Models\EmploymentType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmploymentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EmploymentType::insert([
            ['name' => 'Full-time'],
            ['name' => 'Part-time'],
            ['name' => 'Contractual'],
            ['name' => 'Internship'],
        ]);
    }
}
