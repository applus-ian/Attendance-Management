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

        // Create Employee
        $employee = Employee::create([
            'department' => $engineeringDept->name,
            'job_position' => $backendDev->title,
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
        EmployeeAddress::create([
            'employee_id' => $employee->emp_id,
            'province' => 'Metro Manila',
            'city_or_municipality' => 'Quezon City',
            'barangay' => 'Commonwealth',
            'street' => '123 Main St',
            'postal_code' => '1121',
        ]);

        $user = User::create([
            'emp_id' => $employee->emp_id,
            'email' => $employee->email,
            'password' => Hash::make('password123'),
            'is_active' => true,
            'name' => $employee->first_name,
            'role' => $role->name,
        ]);

        // Ensure required Role exists (or create one)
        $role2 = Role::firstOrCreate(['name' => 'admin']);

        // Ensure JobPosition exists
        $backendDev2 = JobPosition::firstOrCreate(['title' => '3d Design Engineer']);

        // Ensure Department exists
        $engineeringDept2 = Departments::firstOrCreate(['name' => 'Engineering']);

        // Create Employee
        $employee2 = Employee::create([
            'department' => $engineeringDept2->name,
            'job_position' => $backendDev2->title,
            'first_name' => 'Jonathan',
            'middle_name' => 'Reyes',
            'last_name' => 'Dela Rama',
            'suffix' => 'D',
            'gender' => 'male',
            'dob' => '1990-05-15',
            'civil_status' => 'single',
            'nationality' => 'Filipino',
            'phone_number' => '09171234567',
            'emergency_contact1' => '09181234567',
            'emergency_contact2' => '09191234567',
            'date_hired' => '2023-01-10',
            'status' => 'active',
            'email' => 'john3@example.com',
            'profile_pic_url' => null,
        ]);
        EmployeeAddress::create([
            'employee_id' => $employee2->emp_id,
            'province' => 'Cebu',
            'city_or_municipality' => 'Cebu City',
            'barangay' => 'Cogon Ramos',
            'street' => 'Ranudo St',
            'postal_code' => '6000',
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

        // Ensure required Role exists (or create one)
        $role1 = Role::firstOrCreate(['name' => 'employee']);

        // Ensure JobPosition exists
        $backendDev1 = JobPosition::firstOrCreate(['title' => 'Frontend Developer']);

        // Ensure Department exists
        $engineeringDept1 = Departments::firstOrCreate(['name' => 'IT']);

        // Create Employee
        $employee1 = Employee::create([
            'department' => $engineeringDept1->name,
            'job_position' => $backendDev1->title,
            'first_name' => 'Mario',
            'middle_name' => 'Santos',
            'last_name' => 'Dela Calzada',
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
        EmployeeAddress::create([
            'employee_id' => $employee1->emp_id,
            'province' => 'Cebu',
            'city_or_municipality' => 'Cebu City',
            'barangay' => 'Cogon Ramos',
            'street' => 'Ranudo St',
            'postal_code' => '6000',
        ]);

        // Create associated User account with role attribute set
        $user1 = User::create([
            'emp_id' => $employee1->emp_id,
            'email' => $employee1->email,
            'password' => Hash::make('password123'),
            'is_active' => true,
            'name' => $employee1->first_name,
            'role' => $role1->name,
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

        // Ensure required Role exists (or create one)
        $role3 = Role::firstOrCreate(['name' => 'admin']);

        // Ensure JobPosition exists for admin
        $adminJob = JobPosition::firstOrCreate(['title' => 'Admin Officer']);

        // Ensure Department exists for admin
        $adminDept = Departments::firstOrCreate(['name' => 'Administration']);

        // Create Address for admin
        $address3 = EmployeeAddress::create([
            'province' => 'Metro Manila',
            'city_or_municipality' => 'Makati',
            'barangay' => 'Bel-Air',
            'street' => '789 Admin St',
            'postal_code' => '1209',
        ]);

        // Create Employee for admin
        $employee3 = Employee::create([
            'department' => $adminDept->name,
            'job_position' => $adminJob->title,
            'address' => $address3->city_or_municipality,
            'first_name' => 'Ana',
            'middle_name' => 'Lopez',
            'last_name' => 'Reyes',
            'suffix' => null,
            'gender' => 'female',
            'dob' => '1992-07-20',
            'civil_status' => 'single',
            'nationality' => 'Filipino',
            'phone_number' => '09181112222',
            'emergency_contact1' => '09183334444',
            'emergency_contact2' => '09185556666',
            'date_hired' => '2024-01-05',
            'status' => 'active',
            'email' => 'admin@example.com',
            'profile_pic_url' => null,
        ]);

        // Create associated User account with role attribute set
        $user3 = User::create([
            'emp_id' => $employee3->emp_id,
            'email' => $employee3->email,
            'password' => Hash::make('password123'),
            'is_active' => true,
            'name' => $employee3->first_name,
            'role' => $role3->name,
        ]);
    }
}
