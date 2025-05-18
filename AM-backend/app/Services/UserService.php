<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function getAllUsers()
    {
        return User::all();
    }

    public function getUserById(int $id): ?User
    {
        return User::findOrFail($id);
    }

    public function setActive(User $user): User
    {
        $user->update(['is_active' => true]);
        return $user;
    }

    public function setInactive(User $user): User
    {
        $user->update(['is_active' => false]);
        return $user;
    }

    public function deleteUser(User $user): void
    {
        if ($user->is_active === false) {
            $user->delete();
        }
    }
}
