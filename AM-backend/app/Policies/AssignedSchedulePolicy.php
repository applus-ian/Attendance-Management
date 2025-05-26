<?php

namespace App\Policies;

use App\Models\User;
use App\Models\AssignedSchedules;

class AssignedSchedulePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view assigned schedules');
    }

    public function view(User $user, AssignedSchedules $assignedSchedule): bool
    {
        return $user->can('view assigned schedule');
    }

    public function create(User $user): bool
    {
        return $user->can('create assigned schedule');
    }

    public function update(User $user, AssignedSchedules $assignedSchedule): bool
    {
        return $user->can('update assigned schedule');
    }

    public function delete(User $user, AssignedSchedules $assignedSchedule): bool
    {
        return $user->can('delete assigned schedule');
    }

    public function bulkAssign(User $user): bool
    {
        return $user->hasPermissionTo('create assigned schedule');
    }


}