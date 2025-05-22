<?php

namespace App\Services;

use App\Http\Resources\RolePermissionResource;
use App\Models\Permission;
use App\Models\Role;

class RoleService
{
    // Create Role
    public function createRole(array $data)
    {
        return Role::create([
            'name' => $data['name'],
            'description' => $data['description'],
        ]);
    }

    // Read (Get a single role by ID)
    public function getRoleById(int $id): ?Role
    {
        return Role::findOrFail($id);
    }

    // Read (Get all roles - will refactor for filters in the future)
    public function getAllRoles()
    {
        return Role::all();
    }

    // Update Role
    public function updateRole(Role $role, array $data)
    {
        $role->update($data);
        return $role;
    }

    // Delete Role
    public function deleteRole(Role $role): bool
    {
        return $role->delete();
    }

    // Fetch Role With Permissions
    public function roleWithPermissions(int $role_id)
    {
        $role = Role::findOrFail($role_id);
        return new RolePermissionResource($role->load('permissions'));
    }

    // Fetch All Roles With Permissions
    public function allRolesWithPermissions()
    {
        $roles = Role::with('permissions')->get();
        return RolePermissionResource::collection($roles);
    }

    // Fetch All Roles With Permissions
    public function allPermissions()
    {
        return Permission::all();;
    }
}
