<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Holiday;

class HolidayPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view holidays');
    }

    public function view(User $user, Holiday $holiday): bool
    {
        return $user->hasPermissionTo('view holidays');
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create custom holiday');
    }

    public function update(User $user, Holiday $holiday): bool
    {
        // Only manual holidays may be edited
        return ! $holiday->is_auto
            && $user->hasPermissionTo('edit holiday');
    }

    public function delete(User $user, Holiday $holiday): bool
    {
        // Only manual holidays may be removed
        return ! $holiday->is_auto
            && $user->hasPermissionTo('remove holidays');
    }

    public function sync(User $user): bool
    {
        return $user->hasPermissionTo('sync holidays');
    }
}
