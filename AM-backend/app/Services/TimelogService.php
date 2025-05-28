<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Employee;
use App\Models\Timelogs;
use App\Models\AssignedSchedules;
use Illuminate\Support\Facades\Auth;
use App\Models\ManualTimeRequests;

class TimelogService
{
    protected TimesheetService $timesheetService;

    public function __construct(TimesheetService $timesheetService)
    {
        $this->timesheetService = $timesheetService;
    }

    public function clockIn(array $data): Timelogs
    {
        $employee = Employee::findOrFail($data['emp_id']);
        $createdBy = $employee ? $employee->first_name . ' ' . $employee->last_name : 'Unknown';
        $now = Carbon::now();
        $today = $now->toDateString();

        $schedule = AssignedSchedules::where('emp_id', $employee->emp_id)
            ->whereDate('assigned_at', $today)
            ->with('schedule')
            ->first()?->schedule;

        $isLate = $schedule
            ? $now->greaterThan(Carbon::parse($today . ' ' . $schedule->start))
            : false;

        $timelog = Timelogs::create([
            'emp_id' => $employee->emp_id,
            'timelog_type' => 'clock_in',
            'time' => $now,
            'created_by' => $createdBy,
            'is_present' => true,
            'is_absent' => false,
            'is_late' => $isLate,
            'hrs_worked' => 0,
            'overtime_hrs' => 0,
        ]);

        $this->timesheetService->store($employee->emp_id);

        return $timelog;
    }

    public function clockOut(array $data): Timelogs
    {
        $employee = Employee::findOrFail($data['emp_id']);
        ;
        $createdBy = $employee ? $employee->first_name . ' ' . $employee->last_name : 'Unknown';
        $today = Carbon::now()->toDateString();

        $in = Timelogs::where('emp_id', $employee->emp_id)
            ->whereDate('time', $today)
            ->where('timelog_type', 'clock_in')
            ->firstOrFail();

        $inTime = Carbon::parse($in->time);
        $now = Carbon::now();
        $duration = $now->diffInMinutes($inTime) / 60;

        $hasOvertime = ManualTimeRequests::where('emp_id', $employee->emp_id)
            ->where('request_type', 'overtime')
            ->where('approval_status', 'approved')
            ->whereDate('created_at', $today)
            ->exists();

        $overtime = $hasOvertime
            ? max(0, $duration - 8)
            : 0;

        $timelog = Timelogs::create([
            'emp_id' => $employee->emp_id,
            'timelog_type' => 'clock_out',
            'time' => $now,
            'created_by' => $createdBy,
            'is_present' => true,
            'is_absent' => false,
            'is_late' => $in->is_late,
            'hrs_worked' => round($duration, 2),
            'overtime_hrs' => round($overtime, 2),
        ]);

        $this->timesheetService->store($employee->emp_id);

        return $timelog;
    }

    public function markAbsentees(): void
    {
        $today = Carbon::today()->toDateString();

        Employee::query()
            ->with(['assignedSchedules.schedule'])
            ->get()
            ->each(function ($employee) use ($today) {
                $as = $employee->assignedSchedules
                    ->first(fn($a) => $a->assigned_at->toDateString() === $today);

                if (!$as)
                    return;

                $schedule = $as->schedule;
                $exists = Timelogs::where('emp_id', $employee->emp_id)
                    ->whereDate('time', $today)
                    ->exists();

                if (!$exists) {
                    Timelogs::create([
                        'emp_id' => $employee->emp_id,
                        'timelog_type' => 'absent',
                        'time' => now(),
                        'created_by' => 'System',
                        'is_present' => false,
                        'is_absent' => true,
                        'is_late' => false,
                        'hrs_worked' => 0,
                        'overtime_hrs' => 0,
                    ]);
                    $this->timesheetService->store($employee->emp_id);
                }
            });
    }
}