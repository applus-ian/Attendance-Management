<?php

namespace Database\Seeders;

use App\Models\EmploymentStatusHistory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmploymentStatusHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EmploymentStatusHistory::insert([
            ['employee_id' => 1, 'status_set' => 'onboarding', 'effective_date' => now()->toDateString()],
            ['employee_id' => 1, 'status_set' => 'user_created', 'effective_date' => now()->toDateString()],
            ['employee_id' => 1, 'status_set' => 'active', 'effective_date' => now()->toDateString()],
        ]);
    }
}
