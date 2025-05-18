<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view users');
    }

    public function view(User $user, User $model): bool
    {
        return $user->can('view user') || $user->id === $model->id;
    }

    public function setActive(User $user): bool
    {
        return $user->can('set active');
    }

    public function setInactive(User $user): bool
    {
        return $user->can('set inactive');
    }

    public function delete(User $user, User $model): bool
    {
        return $user->can('delete user') && $model->is_active === false;
    }
}
