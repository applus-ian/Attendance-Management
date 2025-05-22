<?php

namespace App\Http\Controllers;

use App\Models\EmployeeProject;
use App\Services\EmployeeProjectService;
use App\Http\Requests\CreateEmployeeProjectRequest;
use App\Http\Requests\UpdateEmployeeProjectRequest;
use Illuminate\Http\JsonResponse;

class EmployeeProjectController extends Controller
{
    protected $employeeProjectService;

    public function __construct(EmployeeProjectService $employeeProjectService)
    {
        $this->employeeProjectService = $employeeProjectService;
    }

    // Create Employee Project
    public function create(CreateEmployeeProjectRequest $request): JsonResponse
    {
        $this->employeeProjectService->createEmployeeProject($request->validated());

        return response()->json(['message' => 'Employee project created successfully!'], 201);
    }

    // Update Employee Project
    public function update(UpdateEmployeeProjectRequest $request, EmployeeProject $employeeProject): JsonResponse
    {
        $updated = $this->employeeProjectService->updateEmployeeProject($employeeProject, $request->validated());

        return response()->json($updated, 200);
    }

    // Get All Employee Projects
    public function index(): JsonResponse
    {
        $projects = $this->employeeProjectService->getAllEmployeeProjects();

        return response()->json($projects, 200);
    }

    // Get a Single Employee Project
    public function show(EmployeeProject $employeeProject): JsonResponse
    {
        return response()->json($employeeProject, 200);
    }

    // Delete Employee Project
    public function destroy(EmployeeProject $employeeProject): JsonResponse
    {
        $this->employeeProjectService->deleteEmployeeProject($employeeProject);

        return response()->json(['message' => 'Employee project deleted successfully!'], 200);
    }
}

