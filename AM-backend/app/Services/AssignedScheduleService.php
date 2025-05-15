<?php

namespace App\Services;

use App\Models\AssignedSchedules;
use App\Models\Employee;
use App\Models\Schedules;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AssignedScheduleService
{
    public function assign(array $data): AssignedSchedules
    {
        $empId = Employee::find($data['emp_id']);
        $scheduleId = Schedules::find($data['sched_id']);
        $assignedAt = Carbon::now();
        $userId = Auth::id();

        // Check if the schedule exists
        $schedule = Schedules::find($scheduleId);
        if (!$schedule) {
            throw ValidationException::withMessages([
                'sched_id' => ['The selected schedule does not exist.']
            ]);
        }

        // Check if the employee exists
        $employee = Employee::find($empId);
        if (!$employee) {
            throw ValidationException::withMessages([
                'emp_id' => ['The selected employee does not exist.']
            ]);
        }

        // Prevent assigning to past dates
        // if (Carbon::parse($assignedAt)->isPast()) {
        //     throw ValidationException::withMessages([
        //         'assigned_at' => ['You cannot assign a schedule in the past.']
        //     ]);
        // }

        // Check if an assignment already exists
        $existing = AssignedSchedules::where('emp_id', $empId)
            ->whereDate('assigned_at', $assignedAt)
            ->first();

        if ($existing) {
            $existing->update([
                'sched_id' => $scheduleId,
                'updated_by' => $userId,
            ]);
            return $existing;
        }

        // Create new assignment with audit
        return AssignedSchedules::create([
            'emp_id' => $empId->emp_id,
            'sched_id' => $scheduleId->sched_id,
            'assigned_at' => $assignedAt,
            'created_by' => $userId,
            'updated_by' => $userId,
        ]);

        // Increment the assigned counter on the schedule
        Schedules::where('sched_id', $data['sched_id'])->increment('num_assigned');
    }


    public function update(AssignedSchedules $assignment, array $data): AssignedSchedules
    {
        if ($assignment->sched_id !== (int) $data['sched_id']) {
            Schedules::where('sched_id', $assignment->sched_id)->decrement('num_assigned');
            Schedules::where('sched_id', $data['sched_id'])->increment('num_assigned');
        }

        $assignment->update([
            'emp_id' => $data['emp_id'],
            'sched_id' => $data['sched_id'],
            'assigned_at' => $data['assigned_at'],
            'updated_by' => Auth::user()->first_name,
        ]);

        return $assignment;
    }

    public function delete(AssignedSchedules $assignment): bool
    {
        Schedules::where('sched_id', $assignment->sched_id)->decrement('num_assigned');
        return $assignment->delete();
    }
}
