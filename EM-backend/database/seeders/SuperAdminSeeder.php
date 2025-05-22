<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $super_admin = Employee::create([
            'first_name' => 'Super',
            'middle_name' => null,
            'last_name' => 'Admin',
            'suffix' => null,
            'gender' => 'male',
            'birthdate' => '1990-01-01',
            'civil_status' => 'single',
            'nationality' => 'Filipino',
            'region' => '070000000',
            'province' => '072200000',
            'city_or_municipality' => '072217000',
            'barangay' => '072217044',
            'street' => 'Ayala',
            'phone_number' => '01234567891',
            'emergency_contact1' => '01234567891',
            'emergency_contact2' => '01234567891',
            'email' => 'super_admin@example.com',
            'job_position_id' => 1, // First default job position is super admin
            'date_hired' => now()->toDateString(),
            'employment_type_id' => 1,
            'manager_id' => null,
            'profile_pic_url' => null,
            'tin_number' => '123-456-789',
            'sss_number' => '34-1234567-9',
            'pagibig_number' => '1234-5678-9012',
            'philhealth_number' => '1234-56789-00',
            'bank_number' => '123456789012',
        ]);

        User::insert([
            'employee_id' => $super_admin->id,
            'email' => 'super_admin@example.com',
            'password' => Hash::make('super_applus123'),
        ]);
    }
}
