<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Timesheets;

class TimesheetPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view timesheets');
    }

    public function view(User $user, Timesheets $timesheet): bool
    {
        return $user->can('view timesheet') || $user->id === $timesheet->emp_id;
    }

    public function create(User $user): bool
    {
        return $user->can('create timesheet');
    }
}
