<?php

namespace App\Services;

use App\Models\AssignedSchedules;
use App\Models\Employee;
use App\Models\Schedules;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;

class AssignedScheduleService
{
    public function assign(array $data): AssignedSchedules
    {
        $empId = $data['emp_id'];
        $schedId = $data['sched_id'];
        $assignedAt = $data['assigned_at'] ?? Carbon::now();
        $userId = Auth::id();

        // Validate existence
        $employee = Employee::find($empId);
        if (!$employee) {
            throw ValidationException::withMessages([
                'emp_id' => ['The selected employee does not exist.']
            ]);
        }

        $schedule = Schedules::find($schedId);
        if (!$schedule) {
            throw ValidationException::withMessages([
                'sched_id' => ['The selected schedule does not exist.']
            ]);
        }

        // Optional: Prevent assigning to past dates
        // if (Carbon::parse($assignedAt)->isPast()) {
        //     throw ValidationException::withMessages([
        //         'assigned_at' => ['You cannot assign a schedule in the past.']
        //     ]);
        // }

        return DB::transaction(function () use ($empId, $schedId, $assignedAt, $userId, $schedule) {

            // Check if assignment already exists for employee on assigned date
            $existing = AssignedSchedules::where('emp_id', $empId)
                ->whereDate('assigned_at', $assignedAt)
                ->first();

            if ($existing) {
                // If schedule changed, update num_assigned counts accordingly
                if ($existing->sched_id !== $schedId) {
                    Schedules::where('sched_id', $existing->sched_id)->decrement('num_assigned');
                    Schedules::where('sched_id', $schedId)->increment('num_assigned');
                }

                $existing->update([
                    'sched_id' => $schedId,
                    'updated_by' => $userId,
                    'assigned_at' => $assignedAt,
                ]);
                return $existing;
            }

            // New assignment, increment num_assigned
            Schedules::where('sched_id', $schedId)->increment('num_assigned');

            return AssignedSchedules::create([
                'emp_id' => $empId,
                'sched_id' => $schedId,
                'assigned_at' => $assignedAt,
                'created_by' => $userId,
                'updated_by' => $userId,
            ]);
        });
    }

    public function update(AssignedSchedules $assignment, array $data): AssignedSchedules
    {
        $userId = Auth::id();

        return DB::transaction(function () use ($assignment, $data, $userId) {
            if ($assignment->sched_id !== (int) $data['sched_id']) {
                Schedules::where('sched_id', $assignment->sched_id)->decrement('num_assigned');
                Schedules::where('sched_id', $data['sched_id'])->increment('num_assigned');
            }

            $assignment->update([
                'emp_id' => $data['emp_id'],
                'sched_id' => $data['sched_id'],
                'assigned_at' => $data['assigned_at'],
                'updated_by' => $userId,
            ]);

            return $assignment;
        });
    }

    public function delete(AssignedSchedules $assignment): bool
    {
        return DB::transaction(function () use ($assignment) {
            Schedules::where('sched_id', $assignment->sched_id)->decrement('num_assigned');
            return $assignment->delete();
        });
    }
}
