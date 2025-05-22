<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Timelogs;
use App\Models\Timesheets;
use App\Models\AssignedSchedules;
use App\Http\Resources\TimesheetResource;

class TimesheetService
{
    public function store(int $empId): TimesheetResource
    {
        $today = Carbon::today();

        $timelogs = Timelogs::where('emp_id', $empId)
            ->whereDate('time', $today);

        $schedule = AssignedSchedules::where('emp_id', $empId)
            ->whereDate('assigned_at', $today)
            ->with('schedule')
            ->first()?->schedule;

        $scheduleHours = 0;
        if ($schedule && $schedule->start && $schedule->end) {
            $start = Carbon::parse($today->format('Y-m-d') . ' ' . $schedule->start);
            $end   = Carbon::parse($today->format('Y-m-d') . ' ' . $schedule->end);

            if ($end->lessThanOrEqualTo($start)) {
                $end->addDay();
            }

            $scheduleHours = $end->diffInMinutes($start) / 60;
        }

        $timesheet = Timesheets::updateOrCreate(
            [
                'emp_id' => $empId,
                'created_at' => $today,
            ],
            [
                'total_hrs_work'     => (float) $timelogs->sum('hrs_worked'),
                'total_overtime_hrs' => (float) $timelogs->sum('overtime_hrs'),
                'total_present'      => (int) $timelogs->clone()->where('is_present', true)->count(),
                'total_absent'       => (int) $timelogs->clone()->where('is_absent', true)->count(),
                'total_lates'        => (int) $timelogs->clone()->where('is_late', true)->count(),
                'scheduled_hrs'       => $scheduleHours,
            ]
        );

        return new TimesheetResource($timesheet);
    }

    public function storeAll(): void
    {
        $employeeIds = Timelogs::select('emp_id')->distinct()->pluck('emp_id');
        foreach ($employeeIds as $empId) {
            $this->store($empId);
        }
    }
}
