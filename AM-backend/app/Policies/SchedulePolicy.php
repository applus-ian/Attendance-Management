<?php
namespace App\Policies;

use App\Models\User;
use App\Models\Schedules;

class SchedulePolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Schedules $schedule): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->hasRole(['admin', 'super_admin']);
    }

    public function update(User $user, Schedules $schedule): bool
    {
        return $user->hasRole(['admin', 'super_admin']);
    }

    public function delete(User $user, Schedules $schedule): bool
    {
        return $user->hasRole(['admin', 'super_admin']);
    }

}

