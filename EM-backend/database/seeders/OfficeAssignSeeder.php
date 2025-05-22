<?php

namespace Database\Seeders;

use App\Models\OfficeAssign;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OfficeAssignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OfficeAssign::insert([
            'name' => 'Cebu',
        ]);
    }
}
