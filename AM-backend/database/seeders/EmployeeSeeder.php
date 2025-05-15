<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Departments;
use App\Models\JobPosition;
use App\Models\EmployeeAddress;
use Illuminate\Database\Seeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $department = Departments::where('name', 'IT')->first();
        $jobPosition = JobPosition::where('title', 'Manager')->first();
        $address = EmployeeAddress::where('province', 'Cebu')->first();
        Employee::factory()->create([
            'first_name' => 'John',
            'middle_name' => 'Doe',
            'last_name' => 'Smith',
            'suffix' => 'Jr.',
            'email' => 'john1@example.com',
            'gender' => 'male',
            'dob' => '1990-01-01',
            'civil_status' => 'single',
            'nationality' => 'American',
            'phone_number' => '123-456-7890',
            'emergency_contact1' => '987-654-3210',
            'emergency_contact2' => '654-321-0987',
            'date_hired' => '2020-01-01',
            'status' => 'active',
            'profile_pic_url' => 'https://example.com/profile-pic.jpg',
            'dept_id' => $department->dept_id,
            'job_position_id' => $jobPosition->job_position_id,
            'address_id' => $address->id,
        ]);
    }
}
