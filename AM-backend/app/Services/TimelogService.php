<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Holiday;
use App\Models\Employee;
use App\Models\Timelogs;
use App\Models\AssignedSchedules;
use Illuminate\Support\Facades\Auth;
use App\Models\ManualTimeRequests;
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
        $now = isset($data['time']) && $data['time'] ? Carbon::parse($data['time']) : Carbon::now();
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

        if (!$schedule) {
            $this->auditLogsService->log(
                action: 'Clock In Blocked',
                type: 'Timelog',
                targetId: $employee->emp_id,
                description: "Attempted clock‑in with no schedule assigned for {$today}"
            );
            throw ValidationException::withMessages([
                'timelog' => ["Cannot clock in: No schedule assigned for today ({$today})."],
            ]);
        }

        $isLate = $schedule
            ? $now->greaterThan(Carbon::parse("{$today} {$schedule->start}"))
            : false;

        $user = Auth::user();
        $employeeUser = $user->employee;
        if ($employeeUser) {
            $fullName = trim(
                $employeeUser->first_name . ' ' .
                    ($employeeUser->middle_name ? $employeeUser->middle_name . ' ' : '') .
                    $employeeUser->last_name .
                    ($employeeUser->suffix ? ' ' . $employeeUser->suffix : '')
            );
        } else {
            $fullName = $user->name ?? ($user->email ?? 'Unknown');
        }

        $timelog = Timelogs::create([
            'emp_id'       => $employee->emp_id,
            'timelog_type' => $data['type'] ?? 'clock_in',
            'time'         => $now,
            'created_by'   => $fullName,
            'is_present'   => true,
            'is_absent'    => false,
            'is_late'      => $isLate,
            'hrs_worked'   => 0,
            'overtime_hrs' => 0,
            'comment'      => $data['comment'] ?? null,
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
        $user = Auth::user();
        $employeeUser = $user->employee;
        if ($employeeUser) {
            $fullName = trim(
                $employeeUser->first_name . ' ' .
                    ($employeeUser->middle_name ? $employeeUser->middle_name . ' ' : '') .
                    $employeeUser->last_name .
                    ($employeeUser->suffix ? ' ' . $employeeUser->suffix : '')
            );
        } else {
            $fullName = $user->name ?? ($user->email ?? 'Unknown');
        }
        $today = Carbon::now()->toDateString();

        $in = Timelogs::where('emp_id', $employee->emp_id)
            ->whereDate('time', $today)
            ->where('timelog_type', 'clock_in')
            ->first();
        if (!$in) {
            throw ValidationException::withMessages([
                'timelog' => ["No clock in record found for today. Cannot clock out."]
            ]);
        }

        $inTime = Carbon::parse($in->time);
        $now = isset($data['time']) ? Carbon::parse($data['time']) : Carbon::now();
        $duration = max(0, $inTime->diffInMinutes($now) / 60);

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
            'time'        => $now,
            'created_by'  => $fullName,
            'is_present'  => true,
            'is_absent'   => false,
            'is_late'     => $in->is_late,
            'hrs_worked'  => round($duration, 2),
            'overtime_hrs' => round($overtime, 2),
            'comment'      => $data['comment'] ?? null,
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
    public function createTimelog(array $data): Timelogs
    {
        $type = $data['timelog_type'] ?? $data['type'] ?? null;
        if ($type === 'clock_in') {
            $data['type'] = 'clock_in';
            return $this->clockIn($data);
        } elseif ($type === 'clock_out') {
            $data['type'] = 'clock_out';
            return $this->clockOut($data);
        } else {
            $user = Auth::user();
            $employee = $user->employee;
            if ($employee) {
                $fullName = trim(
                    $employee->first_name . ' ' .
                        ($employee->middle_name ? $employee->middle_name . ' ' : '') .
                        $employee->last_name .
                        ($employee->suffix ? ' ' . $employee->suffix : '')
                );
                $data['created_by'] = $fullName;
            } else {
                $data['created_by'] = $user->name ?? ($user->email ?? 'Unknown');
            }
            return Timelogs::create($data);
        }
    }
}
