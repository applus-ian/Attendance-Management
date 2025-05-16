<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Employee;
use Illuminate\Database\Seeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employee = Employee::where('email', 'john2@example.com')->first();


        User::factory()->create([
            'emp_id' => $employee->emp_id,
            'email' => $employee->email,
            'password' => bcrypt('password1234'),
            'is_active' => true,
            'name' => 'John Doe',
        ]);

        // Employee::factory()->count(10)->create();

        // $employees = Employee::all();

        // foreach ($employees as $employee) {
        //     User::factory()->create([
        //         'emp_id' => $employee->emp_id,
        //         'email' => $employee->email,
        //     ]);
        // }
    }
}
