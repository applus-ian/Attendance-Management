<?php

namespace Database\Seeders;

use App\Models\CountryAssign;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CountryAssignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CountryAssign::insert([
            'name' => 'Philippines',
        ]);
    }
}
