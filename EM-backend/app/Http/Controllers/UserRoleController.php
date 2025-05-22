<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRoleRequest;
use App\Http\Requests\UpdateUserRoleRequest;
use App\Models\UserRole;
use App\Services\UserRoleService;
use Illuminate\Http\JsonResponse;

class UserRoleController extends Controller
{
    protected $userRoleService;

    public function __construct(UserRoleService $userRoleService)
    {
        $this->userRoleService = $userRoleService;
    }

    // Create User Role Method
    public function create(CreateUserRoleRequest $request): JsonResponse
    {
        $this->userRoleService->createUserRole($request->validated());

        return response()->json(['message' => 'User role created successfully!'], 201);
    }

    // Update User Role Method
    public function update(UpdateUserRoleRequest $request, UserRole $userRole): JsonResponse
    {
        $updatedUserRole = $this->userRoleService->updateUserRole($userRole, $request->validated());

        return response()->json($updatedUserRole, 200);
    }

    // Get All User Roles Method
    public function index(): JsonResponse
    {
        $userRoles = $this->userRoleService->getAllUserRoles();

        return response()->json($userRoles, 200);
    }

    // Get Single User Role Method
    public function show(UserRole $userRole): JsonResponse
    {
        return response()->json($userRole, 200);
    }

    // Delete User Role Method
    public function destroy(UserRole $userRole): JsonResponse
    {
        $this->userRoleService->deleteUserRole($userRole);

        return response()->json(['message' => 'User role deleted successfully!'], 200);
    }
}
