<?php

namespace App\Services;

use App\Models\User;
use App\Http\Resources\UserResource;

class UserService
{
    public function getAllUsers()
    {
        $users = User::with(['employee.assignedSchedule.schedule', 'roles:name'])->get();

        return UserResource::collection($users);
    }

    public function getUserById(int $id)
    {
        $user = User::with(['employee.assignedSchedule.schedule', 'roles:name'])
            ->findOrFail($id);

        return new UserResource($user);
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
