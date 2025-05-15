<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Schedules;

class SchedulePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->permissions->contains('name', 'view_any_schedule');
    }

    public function view(User $user, Schedules $schedule): bool
    {
        return $user->permissions->contains('name', 'view_schedule');
    }

    public function create(User $user): bool
    {
        return $user->permissions->contains('name', 'create_schedule');
    }

    public function update(User $user, Schedules $schedule): bool
    {
        return $user->user_permissions()->contains('name', 'update_schedule');
    }

    public function delete(User $user, Schedules $schedule): bool
    {
        return $user->permissions->contains('name', 'delete_schedule');
    }
}
