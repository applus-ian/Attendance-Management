<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Employee;
use App\Models\Timelogs;
use App\Models\AssignedSchedules;
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
        $employee = Employee::find($data['emp_id']);
        $createdBy = $employee ? $employee->first_name . ' ' . $employee->last_name : 'Unknown';
        $now = Carbon::now();
        $today = $now->toDateString();

        $schedule = AssignedSchedules::where('emp_id', $employee->id)
            ->whereDate('assigned_at', $today)
            ->with('schedule')
            ->first();

        $expectedTime = $schedule?->schedule?->start ?? $now;
        $isLate = Carbon::parse($now)->gt(Carbon::parse($expectedTime));

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

    public function clockOut(array $data): ?Timelogs
    {
        $employee = Employee::find($data['emp_id']);
        $createdBy = $employee ? $employee->first_name . ' ' . $employee->last_name : 'Unknown';
        $today = Carbon::now()->toDateString();

        $clockIn = Timelogs::where('emp_id', $employee->id)
            ->whereDate('time', $today)
            ->where('timelog_type', 'clock_in')
            ->first();

        if (!$clockIn) {
            return null;
        }

        $clockInTime = Carbon::parse($clockIn->time);
        $now = Carbon::now();
        $workDuration = $now->diffInMinutes($clockInTime) / 60;

        $timelog = Timelogs::create([
            'emp_id' => $employee->id,
            'timelog_type' => 'clock_out',
            'time' => $now,
            'created_by' => $createdBy,
            'is_present' => true,
            'is_absent' => false,
            'is_late' => $clockIn->is_late,
            'hrs_worked' => round($workDuration, 2),
            'overtime_hrs' => max(0, $workDuration - 8),
        ]);

        $updateData = [
            'hrs_worked' => round($workDuration, 2),
        ];

        $approvedOvertime = ManualTimeRequests::where('emp_id', $employee->emp_id)
            ->where('request_type', 'overtime')
            ->where('status', 'approved')
            ->first();

        if ($approvedOvertime) {
            $updateData['overtime_hrs'] = max(0, $workDuration - 8);
        }

        $clockIn->update($updateData);

        $this->timesheetService->store($employee->id);

        return $timelog;
    }

    public function markAbsentees(): void
    {
        $today = Carbon::today();

        $employees = Employee::with(['assignedSchedules.schedule'])->get();

        foreach ($employees as $employee) {
            $assignedSchedule = $employee->assignedSchedules
                ->where('schedule.day', $today->format('l'))
                ->first();

            if (!$assignedSchedule) {
                continue;
            }

            $schedule = $assignedSchedule->schedule;

            $hasTimelog = Timelogs::where('emp_id', $employee->emp_id)
                ->whereDate('time', $today)
                ->where(function ($query) use ($schedule) {
                    $query->whereTime('time', '>=', $schedule->sched_start)
                        ->whereTime('time', '<=', $schedule->sched_end);
                })
                ->exists();

            if (!$hasTimelog) {
                Timelogs::create([
                    'emp_id' => $employee->emp_id,
                    'timelog_type' => 'absent',
                    'time' => now(),
                    'created_by' => 'System',
                    'is_absent' => true,
                ]);
            }
        }
    }
}
