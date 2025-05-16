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

    public function create(User $user): bool
    {
        return $user->can('create timelog');
    }

    public function update(User $user, Timelogs $timelog): bool
    {
        return $user->can('update timelog');
    }

    public function delete(User $user, Timelogs $timelog): bool
    {
        return $user->can('delete timelog');
    }
}
