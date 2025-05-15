<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Timelogs;

class TimelogPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->permissions->contains('name', 'view_any_timelog');
    }

    public function view(User $user, Timelogs $timelog): bool
    {
        return $user->permissions->contains('name', 'view_timelog');
    }

    public function create(User $user): bool
    {
        return $user->permissions->contains('name', 'create_timelog');
    }

    public function update(User $user, Timelogs $timelog): bool
    {
        return $user->permissions->contains('name', 'update_timelog');
    }

    public function delete(User $user, Timelogs $timelog): bool
    {
        return $user->permissions->contains('name', 'delete_timelog');
    }
}
