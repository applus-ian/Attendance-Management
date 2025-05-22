<?php

namespace Database\Seeders;

use App\Models\DepartmentAssign;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentAssignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DepartmentAssign::insert([
            'name' => 'Information Technology',
            'parent_department_id' => null,
        ]);
    }
}
