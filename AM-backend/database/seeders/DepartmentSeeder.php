<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Departments;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        Departments::create([
            'manager' => 'Juan Dela Cruz',
            'name' => 'Engineering',
        ]);

        Departments::create([
            'manager' => 'Maria Clara',
            'name' => 'HR',
        ]);

        Departments::create([
            'manager' => 'Jose Rizal',
            'name' => 'Admin',
        ]);

        Departments::create([
            'manager' => 'Andres Bonifacio',
            'name' => 'IT Support',
        ]);
    }
}
