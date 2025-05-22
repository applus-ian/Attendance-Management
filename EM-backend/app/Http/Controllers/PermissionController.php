<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;
use App\Models\Permission;
use App\Services\PermissionService;
use Illuminate\Http\JsonResponse;

class PermissionController extends Controller
{
    protected $permissionService;

    public function __construct(PermissionService $permissionService)
    {
        $this->permissionService = $permissionService;
    }

    // Create Permission Method
    public function create(CreatePermissionRequest $request): JsonResponse
    {
        $this->permissionService->createPermission($request->validated());

        return response()->json(['message' => 'Permission created successfully!'], 201);
    }

    // Update Permission Method
    public function update(UpdatePermissionRequest $request, Permission $permission): JsonResponse
    {
        $updatedPermission = $this->permissionService->updatePermission($permission, $request->validated());

        return response()->json($updatedPermission, 200);
    }

    // Get All Permissions Method
    public function index(): JsonResponse
    {
        $permissions = $this->permissionService->getAllPermissions();

        return response()->json($permissions, 200);
    }

    // Get Single Permission Method
    public function show(Permission $permission): JsonResponse
    {
        return response()->json($permission, 200);
    }

    // Delete Permission Method
    public function destroy(Permission $permission): JsonResponse
    {
        $this->permissionService->deletePermission($permission);

        return response()->json(['message' => 'Permission deleted successfully!'], 200);
    }
}
