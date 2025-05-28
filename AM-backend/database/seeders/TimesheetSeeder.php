<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Timesheets;
use App\Models\Timelogs;

class TimesheetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // For each employee, create a timesheet and several timelogs
        $employees = Employee::all();
        foreach ($employees as $employee) {
            // Create a timesheet for this employee
            $timesheet = Timesheets::create([
                'emp_id' => $employee->emp_id,
                'total_hrs_work' => rand(40, 80),
                'total_overtime_hrs' => rand(0, 10),
                'total_present' => rand(5, 10),
                'total_absent' => rand(0, 2),
                'total_lates' => rand(0, 3),
                'scheduled_hrs' => 80,
                'timesheet_date' => now()->toDateString(),
            ]);

            // Create 5 timelogs for this timesheet
            for ($i = 0; $i < 5; $i++) {
                Timelogs::factory()->create([
                    'emp_id' => $employee->emp_id,
                    'timesheet_id' => $timesheet->timesheet_id,
                ]);
            }
        }
    }
}
