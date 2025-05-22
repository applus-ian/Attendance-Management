<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Models\Role;
use App\Services\RoleService;
use Illuminate\Http\JsonResponse;

class RoleController extends Controller
{
    protected $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    // Create Role Method
    public function create(CreateRoleRequest $request): JsonResponse
    {
        $this->roleService->createRole($request->validated());

        return response()->json(['message' => 'Role created successfully!'], 201);
    }

    // Update Role Method
    public function update(UpdateRoleRequest $request, Role $role): JsonResponse
    {
        $updatedRole = $this->roleService->updateRole($role, $request->validated());

        return response()->json($updatedRole, 200);
    }

    // Get All Roles Method
    public function index(): JsonResponse
    {
        $roles = $this->roleService->getAllRoles();

        return response()->json($roles, 200);
    }

    // Get Single Role Method
    public function show(Role $role): JsonResponse
    {
        return response()->json($role, 200);
    }

    // Delete Role Method
    public function destroy(Role $role): JsonResponse
    {
        $this->roleService->deleteRole($role);

        return response()->json(['message' => 'Role deleted successfully!'], 200);
    }

    // fetch role with permissions
    public function getRoleWithPermissions(Role $role): JsonResponse
    {
        $roleWithPermissions = $this->roleService->roleWithPermissions($role->id);

        return response()->json($roleWithPermissions, 200);
    }

    // fetch all roles with permissions
    public function getAllRolesWithPermissions(): JsonResponse
    {
        $allRolesWithPermissions = $this->roleService->allRolesWithPermissions();

        return response()->json($allRolesWithPermissions, 200);
    }

    // fetch all permissions
    public function getAllPermissions(): JsonResponse
    {
        $allPermissions = $this->roleService->allPermissions();

        return response()->json($allPermissions, 200);
    }
}
