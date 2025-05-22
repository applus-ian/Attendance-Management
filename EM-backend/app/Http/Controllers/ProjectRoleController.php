<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProjectRoleRequest;
use App\Http\Requests\UpdateProjectRoleRequest;
use App\Models\ProjectRole;
use App\Services\ProjectRoleService;
use Illuminate\Http\JsonResponse;

class ProjectRoleController extends Controller
{
    protected $projectRoleService;

    public function __construct(ProjectRoleService $projectRoleService)
    {
        $this->projectRoleService = $projectRoleService;
    }

    // Create Project Role Method
    public function create(CreateProjectRoleRequest $request): JsonResponse
    {
        $this->projectRoleService->createProjectRole($request->validated());

        return response()->json(['message' => 'Project role created successfully!'], 201);
    }

    // Update Project Role Method
    public function update(UpdateProjectRoleRequest $request, ProjectRole $projectRole): JsonResponse
    {
        $updatedRole = $this->projectRoleService->updateProjectRole($projectRole, $request->validated());

        return response()->json($updatedRole, 200);
    }

    // Get All Project Roles Method
    public function index(): JsonResponse
    {
        $roles = $this->projectRoleService->getAllProjectRoles();

        return response()->json($roles, 200);
    }

    // Get Single Project Role Method
    public function show(ProjectRole $projectRole): JsonResponse
    {
        return response()->json($projectRole, 200);
    }

    // Delete Project Role Method
    public function destroy(ProjectRole $projectRole): JsonResponse
    {
        $this->projectRoleService->deleteProjectRole($projectRole);

        return response()->json(['message' => 'Project role deleted successfully!'], 200);
    }
}
