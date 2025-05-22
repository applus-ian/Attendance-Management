<?php

namespace App\Services;

use App\Models\Permission;

class PermissionService
{
    // Create Permission
    public function createPermission(array $data)
    {
        return Permission::create([
            'name' => $data['name'],
            'description' => $data['description'],
        ]);
    }

    // Read (Get a single permission by ID)
    public function getPermissionById(int $id): ?Permission
    {
        return Permission::findOrFail($id);
    }

    // Read (Get all permissions - will refactor for filters in the future)
    public function getAllPermissions()
    {
        return Permission::all();
    }

    // Update Permission
    public function updatePermission(Permission $permission, array $data)
    {
        $permission->update($data);
        return $permission;
    }

    // Delete Permission
    public function deletePermission(Permission $permission): bool
    {
        return $permission->delete();
    }
}
