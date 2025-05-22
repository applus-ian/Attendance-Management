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
        $schedId = $data['sched_id'];
        $assignedAt = Carbon::now();
        $userId = Auth::id();

        $schedule = Schedules::find($schedId);
        if (!$schedule) {
            throw ValidationException::withMessages([
                'sched_id' => ['The selected schedule does not exist.']
            ]);
        }

        $employee = Employee::find($empId);
        if (!$employee) {
            throw ValidationException::withMessages([
                'emp_id' => ['The selected employee does not exist.']
            ]);
        }

        $existing = AssignedSchedules::where('emp_id', $empId)
            ->whereDate('assigned_at', $assignedAt)
            ->first();

        if ($existing) {
            $existing->update([
                'sched_id' => $schedId,
                'updated_by' => $userId,
            ]);
            return $existing;
        }

        Schedules::where('sched_id', $schedId)->increment('num_assigned');

        return AssignedSchedules::create([
            'emp_id' => $empId->emp_id,
            'sched_id' => $schedId,
            'assigned_at' => $assignedAt,
            'created_by' => $userId,
            'updated_by' => $userId,
        ]);
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
            'updated_by' => Auth::id(),
        ]);

        return $assignment;
    }

    public function delete(AssignedSchedules $assignment): bool
    {
        Schedules::where('sched_id', $assignment->sched_id)->decrement('num_assigned');
        return $assignment->delete();
    }
}
