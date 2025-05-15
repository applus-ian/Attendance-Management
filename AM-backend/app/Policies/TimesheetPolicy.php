<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Timesheets;

class TimesheetPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->permissions->contains('name', 'view_any_timesheet');
    }

    public function view(User $user, Timesheets $timesheet): bool
    {
        return $user->permissions->contains('name', 'view_timesheet') || $user->id === $timesheet->emp_id;
    }

    public function create(User $user): bool
    {
        return $user->permissions->contains('name', 'create_timesheet');
    }
}
