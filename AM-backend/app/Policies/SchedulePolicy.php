<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Schedules;

class SchedulePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view schedules');
    }

    public function view(User $user, Schedules $schedule): bool
    {
        return $user->can('view schedule');
    }

    public function create(User $user): bool
    {
        return $user->can('create schedule');
    }

    public function update(User $user, Schedules $schedule): bool
    {
        return $user->can('update schedule');
    }

    public function delete(User $user, Schedules $schedule): bool
    {
        return $user->can('delete schedule');
    }
}
