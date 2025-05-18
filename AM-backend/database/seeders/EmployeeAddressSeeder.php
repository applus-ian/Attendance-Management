<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EmployeeAddress;

class EmployeeAddressSeeder extends Seeder
{
    public function run(): void
    {
        EmployeeAddress::factory()->create([
            'province' => 'Cebu',
            'city_or_municipality' => 'Carmen',
            'barangay' => 'Baring',
            'street' => 'San Juan',
            'postal_code' => '6005',
        ]);
    }
}
