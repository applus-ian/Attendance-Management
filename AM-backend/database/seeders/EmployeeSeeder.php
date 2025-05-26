<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Employee;
use App\Models\Departments;
use App\Models\JobPosition;
use App\Models\EmployeeAddress;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure required Role exists (or create one)
        $role = Role::firstOrCreate(['name' => 'super_admin']);

        // Ensure JobPosition exists
        $backendDev = JobPosition::firstOrCreate(['title' => 'Backend Developer']);

        // Ensure Department exists
        $engineeringDept = Departments::firstOrCreate(['name' => 'Engineering']);

        // Create Address
        $address = EmployeeAddress::create([
            'province' => 'Metro Manila',
            'city_or_municipality' => 'Quezon City',
            'barangay' => 'Commonwealth',
            'street' => '123 Main St',
            'postal_code' => '1121',
        ]);

        // Create Employee
        $employee = Employee::create([
            'department' => $engineeringDept->name,
            'job_position' => $backendDev->title,
            'address' => $address->city_or_municipality,
            'first_name' => 'Juan',
            'middle_name' => 'Santos',
            'last_name' => 'Dela Cruz',
            'suffix' => null,
            'gender' => 'male',
            'dob' => '1990-05-15',
            'civil_status' => 'single',
            'nationality' => 'Filipino',
            'phone_number' => '09171234567',
            'emergency_contact1' => '09181234567',
            'emergency_contact2' => '09191234567',
            'date_hired' => '2023-01-10',
            'status' => 'active',
            'email' => 'john1@example.com',
            'profile_pic_url' => null,
        ]);

        // Create associated User account with role attribute set
        $user = User::create([
            'emp_id' => $employee->emp_id,
            'email' => $employee->email,
            'password' => Hash::make('password123'),
            'is_active' => true,
            'name' => $employee->first_name,
            'role' => $role->name,
        ]);

        // Ensure required Role exists (or create one)
        $role2 = Role::firstOrCreate(['name' => 'employee']);

        // Ensure JobPosition exists
        $backendDev2 = JobPosition::firstOrCreate(['title' => 'Backend Developer']);

        // Ensure Department exists
        $engineeringDept2 = Departments::where('name', 'Engineering')->first();

        // Create Address
        $address2 = EmployeeAddress::create([
            'province' => 'Metro Manila',
            'city_or_municipality' => 'Quezon City',
            'barangay' => 'Commonwealth',
            'street' => '123 Main St',
            'postal_code' => '1121',
        ]);

        // Create Employee
        $employee2 = Employee::create([
            'department' => $engineeringDept2->name,
            'job_position' => $backendDev2->title,
            'address' => $address2->city_or_municipality,
            'first_name' => 'shiela',
            'middle_name' => 'arcillo',
            'last_name' => 'Dela Cruz',
            'suffix' => null,
            'gender' => 'male',
            'dob' => '1990-05-15',
            'civil_status' => 'single',
            'nationality' => 'Filipino',
            'phone_number' => '09171234567',
            'emergency_contact1' => '09181234567',
            'emergency_contact2' => '09191234567',
            'date_hired' => '2023-01-10',
            'status' => 'active',
            'email' => 'john2@example.com',
            'profile_pic_url' => null,
        ]);

        // Create associated User account with role attribute set
        $user2 = User::create([
            'emp_id' => $employee2->emp_id,
            'email' => $employee2->email,
            'password' => Hash::make('password123'),
            'is_active' => true,
            'name' => $employee2->first_name,
            'role' => $role2->name,
        ]);

    }
}
