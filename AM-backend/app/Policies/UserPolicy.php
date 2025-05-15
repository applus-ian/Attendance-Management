<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAll(User $user): bool
    {
        return $user->permissions->contains('name', 'view_all_user');
    }

    public function view(User $user, User $model): bool
    {
        return $user->permissions->contains('name', 'view_user') || $user->id === $model->id;
    }

    public function create(User $user): bool
    {
        return $user->permissions->contains('name', 'create_user');
    }

    public function update(User $user, User $model): bool
    {
        return $user->permissions->contains('name', 'update_user') && $user->id !== $model->id;
    }

    public function delete(User $user, User $model): bool
    {
        return $user->permissions->contains('name', 'delete_user') && $user->id !== $model->id;
    }
}
