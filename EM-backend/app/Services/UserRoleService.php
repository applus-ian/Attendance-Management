<?php

namespace App\Services;

use App\Models\UserRole;

class UserRoleService
{
    // Create User Role
    public function createUserRole(array $data)
    {
        return UserRole::create([
            'user_id' => $data['user_id'],
            'role_id' => $data['role_id'],
        ]);
    }

    // Read (Get a single user role by ID)
    public function getUserRoleById(int $id): ?UserRole
    {
        return UserRole::findOrFail($id);
    }

    // Read (Get all user roles - will refactor for filters in the future)
    public function getAllUserRoles()
    {
        return UserRole::all();
    }

    // Update User Role
    public function updateUserRole(UserRole $user_role, array $data)
    {
        $user_role->update($data);
        return $user_role;
    }

    // Delete User Role
    public function deleteUserRole(UserRole $user_role): bool
    {
        return $user_role->delete();
    }
}
