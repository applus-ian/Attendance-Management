<?php

namespace Database\Seeders;

use App\Models\JobPosition;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobPositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        JobPosition::insert([
            ['title' => 'Super Admin'],

            ['title' => 'Country Manager'],
            ['title' => 'Finance ERP Functional Specialist'],
            ['title' => 'Procurement Specialist'],
            ['title' => 'HR Officer'],
            ['title' => 'Admin Executive'],
            ['title' => 'Expense Auditor'],

            ['title' => 'IT Manager'],
            ['title' => 'Senior Software Developer'],
            ['title' => 'Software Developer'],
            ['title' => 'Software QA Automation Tester'],
            ['title' => 'System Administrator'],

            ['title' => 'Lead HR Administrator'],
            ['title' => 'HR Administrator'],
            ['title' => 'Project Manager'],
            ['title' => 'Software QA Systems Tester'],

            ['title' => 'FSS-Cebu Delivery Lead'],
            ['title' => 'RTR Lead'],
            ['title' => 'PTP/OTC Lead'],
            ['title' => 'RTR Specialist'],
            ['title' => 'RTR/IC Specialist'],
            ['title' => 'PTP Specialist'],
            ['title' => 'OTC Specialist'],
        ]);
    }
}
