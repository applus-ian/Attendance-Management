<?php

namespace App\Services;

use App\Models\AssignedSchedules;
use App\Models\Employee;
use App\Models\Schedules;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Collection;

class AssignedScheduleService
{
    public function assign(array $data): AssignedSchedules
    {
        $empId = $data['emp_id'];
        $schedId = $data['sched_id'];
        $assignedAt = $data['assigned_at'] ?? now();
        $userId = Auth::id();

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

        return DB::transaction(function () use ($empId, $schedId, $assignedAt, $userId) {
            $existing = AssignedSchedules::where('emp_id', $empId)
                ->whereDate('assigned_at', $assignedAt)
                ->first();

            if ($existing) {
                if ($existing->sched_id !== $schedId) {
                    Schedules::where('sched_id', $existing->sched_id)->decrement('num_assigned');
                    Schedules::where('sched_id', $schedId)->increment('num_assigned');
                }

                $existing->update([
                    'sched_id' => $schedId,
                    'assigned_at' => $assignedAt,
                    'updated_by' => $userId,
                ]);

                return $existing;
            }

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
            $newSchedId = $data['sched_id'];

            if ($assignment->sched_id !== $newSchedId) {
                Schedules::where('sched_id', $assignment->sched_id)->decrement('num_assigned');
                Schedules::where('sched_id', $newSchedId)->increment('num_assigned');
            }

            $assignment->update([
                'emp_id' => $data['emp_id'],
                'sched_id' => $newSchedId,
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

    public function bulkAssign(int $schedId, array $empIds, $assignedAt): Collection
    {
        $schedule = Schedules::find($schedId);
        if (!$schedule) {
            throw ValidationException::withMessages([
                'sched_id' => ['Schedule not found.']
            ]);
        }

        $userId = Auth::id();
        $results = collect();

        foreach ($empIds as $empId) {
            $employee = Employee::find($empId);
            if (!$employee) {
                throw ValidationException::withMessages([
                    'emp_ids' => ["Employee with ID {$empId} does not exist."]
                ]);
            }

            $existing = AssignedSchedules::where('emp_id', $empId)
                ->whereDate('assigned_at', $assignedAt)
                ->first();

            if ($existing) {
                if ($existing->sched_id !== $schedId) {
                    Schedules::where('sched_id', $existing->sched_id)->decrement('num_assigned');
                    Schedules::where('sched_id', $schedId)->increment('num_assigned');
                }

                $existing->update([
                    'sched_id' => $schedId,
                    'updated_by' => $userId,
                ]);

                $results->push($existing);
            } else {
                Schedules::where('sched_id', $schedId)->increment('num_assigned');

                $newAssignment = AssignedSchedules::create([
                    'emp_id' => $empId,
                    'sched_id' => $schedId,
                    'assigned_at' => $assignedAt,
                    'created_by' => $userId,
                    'updated_by' => $userId,
                ]);

                $results->push($newAssignment);
            }
        }

        return $results;
    }
}
