<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateEmploymentTypeRequest;
use App\Http\Requests\UpdateEmploymentTypeRequest;
use App\Models\EmploymentType;
use App\Services\EmploymentTypeService;
use Illuminate\Http\JsonResponse;

class EmploymentTypeController extends Controller
{
    protected $employmentTypeService;

    public function __construct(EmploymentTypeService $employmentTypeService)
    {
        $this->employmentTypeService = $employmentTypeService;
    }

    // Create Employment Type Method
    public function create(CreateEmploymentTypeRequest $request): JsonResponse
    {
        $this->employmentTypeService->createEmploymentType($request->validated());

        return response()->json(['message' => 'Employment Type created successfully!'], 201);
    }

    // Update Employment Type Method
    public function update(UpdateEmploymentTypeRequest $request, EmploymentType $employmentType): JsonResponse
    {
        // Proceed with updating the employment type's details
        $updated_employment_type = $this->employmentTypeService->updateEmploymentType($employmentType, $request->validated());

        // Return the updated employment type as a JSON response
        return response()->json($updated_employment_type, 200);
    }

    // Get All Employment Types Method
    public function index(): JsonResponse
    {
        $employment_types = $this->employmentTypeService->getAllEmploymentTypes();

        return response()->json($employment_types, 200);
    }

    // Get Single Employment Type Method
    public function show(EmploymentType $employmentType): JsonResponse
    {
        return response()->json($employmentType, 200);
    }

    // Delete Employment Type Method
    public function destroy(EmploymentType $employmentType): JsonResponse
    {
        $this->employmentTypeService->deleteEmploymentType($employmentType);

        return response()->json(['message' => 'Employment Type deleted successfully!'], 200);
    }
}
