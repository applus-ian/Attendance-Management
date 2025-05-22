<?php

namespace App\Services;

use App\Models\RolePermission;

class RolePermissionService
{
    // Create Role Permission
    public function createRolePermission(array $data)
    {
        return RolePermission::create([
            'role_id' => $data['role_id'],
            'permission_id' => $data['permission_id'],
        ]);
    }

    // Read (Get a single role permission by ID)
    public function getRolePermissionById(int $id): ?RolePermission
    {
        return RolePermission::findOrFail($id);
    }

    // Read (Get all role permissions - will refactor for filters in the future)
    public function getAllRolePermissions()
    {
        return RolePermission::all();
    }

    // Update Role Permission
    public function updateRolePermission(RolePermission $role_permission, array $data)
    {
        $role_permission->update($data);
        return $role_permission;
    }

    // Delete Role Permission
    public function deleteRolePermission(RolePermission $role_permission): bool
    {
        return $role_permission->delete();
    }
}
