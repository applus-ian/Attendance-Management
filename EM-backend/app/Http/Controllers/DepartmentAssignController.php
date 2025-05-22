<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDepartmentAssignRequest;
use App\Http\Requests\UpdateDepartmentAssignRequest;
use App\Models\DepartmentAssign;
use App\Services\DepartmentAssignService;
use Illuminate\Http\JsonResponse;

class DepartmentAssignController extends Controller
{
    protected $departmentAssignService;

    public function __construct(DepartmentAssignService $departmentAssignService)
    {
        $this->departmentAssignService = $departmentAssignService;
    }

    // Create Department Assign Method
    public function create(CreateDepartmentAssignRequest $request): JsonResponse
    {
        $this->departmentAssignService->createDepartmentAssign($request->validated());

        return response()->json(['message' => 'Department assignment created successfully!'], 201);
    }

    // Update Department Assign Method
    public function update(UpdateDepartmentAssignRequest $request, DepartmentAssign $departmentAssign): JsonResponse
    {
        // Proceed with updating the assigned department's details
        $updated_department_assign = $this->departmentAssignService->updateDepartmentAssign($departmentAssign, $request->validated());

        // Return the updated assigned department as a JSON response
        return response()->json($updated_department_assign, 200);
    }

    // Get All Departments Assigned Method
    public function index(): JsonResponse
    {
        $department_assigns = $this->departmentAssignService->getAllDepartmentAssigns();

        return response()->json($department_assigns, 200);
    }

    // Get Single Department Assigned Method
    public function show(DepartmentAssign $departmentAssign): JsonResponse
    {
        return response()->json($departmentAssign, 200);
    }

    // Delete Department Assigned Method
    public function destroy(DepartmentAssign $departmentAssign): JsonResponse
    {
        $this->departmentAssignService->deleteDepartmentAssign($departmentAssign);

        return response()->json(['message' => 'The assigned department was deleted successfully!'], 200);
    }
}
