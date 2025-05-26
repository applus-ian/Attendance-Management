<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Holiday;
use App\Models\Employee;
use App\Models\Timelogs;
use App\Models\AssignedSchedules;
use App\Models\ManualTimeRequests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class TimelogService
{
    public function __construct(protected TimesheetService $timesheetService,  protected AuditLogsService $auditLogsService)
    {
        $this->timesheetService = $timesheetService;
        $this->auditLogsService = $auditLogsService;
    }

    public function clockIn(array $data): Timelogs
    {
        $employee = Employee::findOrFail($data['emp_id']);
        $now      = Carbon::parse($data['time'] ?? now());
        $today    = $now->toDateString();

        $isHoliday = Holiday::whereDate('date', $today)
            ->where('active', true)
            ->whereIn('type', [
                'Regular Holiday',
                'Special Non‑working Holiday',
            ])
            ->exists();

        if ($isHoliday) {
            $this->auditLogsService->log(
                action: 'Clock In Blocked',
                type: 'Timelog',
                targetId: $employee->emp_id,
                description: "Attempted clock‑in on holiday {$today}"
            );

            throw ValidationException::withMessages([
                'timelog' => ["Cannot clock in on a holiday ({$today})."],
            ]);
        }

        $schedule = AssignedSchedules::where('emp_id', $employee->emp_id)
            ->whereDate('assigned_at', $today)
            ->with('schedule')
            ->first()?->schedule;

        $isLate = $schedule
            ? $now->greaterThan(Carbon::parse("{$today} {$schedule->start}"))
            : false;

        $timelog = Timelogs::create([
            'emp_id'       => $employee->emp_id,
            'timelog_type' => $data['type'] ?? 'clock_in',
            'time'         => $now,
            'created_by'   => Auth::user()->user_id,
            'is_present'   => true,
            'is_absent'    => false,
            'is_late'      => $isLate,
            'hrs_worked'   => 0,
            'overtime_hrs' => 0,
        ]);

        $this->timesheetService->store($employee->emp_id);

        $this->auditLogsService->log(
            action: 'Clock In',
            type: 'Timelog',
            targetId: $timelog->timelog_id,
            description: 'Clocked in successfully'
        );

        return $timelog;
    }

    public function clockOut(array $data): Timelogs
    {
        $employee   = Employee::findOrFail($data['emp_id']);
        $createdBy = $employee ? $employee->first_name . ' ' . $employee->last_name : 'Unknown';
        $today = Carbon::now()->toDateString();

        $in    = Timelogs::where('emp_id', $employee->emp_id)
            ->whereDate('time', $today)
            ->where('timelog_type', 'clock_in')
            ->firstOrFail();

        $inTime = Carbon::parse($in->time);
        $now = isset($data['time']) ? Carbon::parse($data['time']) : Carbon::now();
        $duration = $now->diffInMinutes($inTime) / 60;

        $hasOvertime = ManualTimeRequests::where('emp_id', $employee->emp_id)
            ->where('request_type', 'overtime')
            ->where('status', 'approved')
            ->whereDate('request_date', $today)
            ->exists();

        $overtime = $hasOvertime
            ? max(0, $duration - 8)
            : 0;

        $timelog = Timelogs::create([
            'emp_id'       => $employee->emp_id,
            'timelog_type' => 'clock_out',
            'time'        => $now,
            'created_by'  => $createdBy,
            'is_present'  => true,
            'is_absent'   => false,
            'is_late'     => $in->is_late,
            'hrs_worked'  => round($duration, 2),
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

                if (!$as) return;

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
