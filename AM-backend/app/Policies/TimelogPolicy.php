<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Timelogs;

class TimelogPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view timelogs');
    }

    public function view(User $user, Timelogs $timelog): bool
    {
        return $user->can('view timelog');
    }

    public function clockIn(User $user): bool
    {
        return $user->can('clock in');
    }

    public function clockOut(User $user, Timelogs $timelog): bool
    {
        return $user->can('clock out');
    }
}
