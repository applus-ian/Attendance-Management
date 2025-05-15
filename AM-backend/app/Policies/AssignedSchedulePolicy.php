<?php

namespace App\Policies;

use App\Models\User;
use App\Models\AssignedSchedules;

class AssignedSchedulePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->permissions->contains('name', 'view_any_assigned_schedule');
    }

    public function view(User $user, AssignedSchedules $assignedSchedule): bool
    {
        return $user->permissions->contains('name', 'view_assigned_schedule');
    }

    public function create(User $user): bool
    {
        return $user->permissions->contains('name', 'create_assigned_schedule');
    }

    public function update(User $user, AssignedSchedules $assignedSchedule): bool
    {
        return $user->permissions->contains('name', 'update_assigned_schedule');
    }

    public function delete(User $user, AssignedSchedules $assignedSchedule): bool
    {
        return $user->permissions->contains('name', 'delete_assigned_schedule');
    }
}
