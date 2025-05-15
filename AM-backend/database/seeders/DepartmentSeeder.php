<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Departments;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        // $employee = User::where('role', 'admin')->first();

        Departments::factory()->create([
            'name' => 'IT'
        ]);
    }
}
