<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateLocationAssignmentRequest;
use App\Http\Requests\UpdateLocationAssignmentRequest;
use App\Models\LocationAssignment;
use App\Services\LocationAssignmentService;
use Illuminate\Http\JsonResponse;

class LocationAssignmentController extends Controller
{
    protected $locationAssignmentService;

    public function __construct(LocationAssignmentService $locationAssignmentService)
    {
        $this->locationAssignmentService = $locationAssignmentService;
    }

    // Create Location Assignment Method
    public function create(CreateLocationAssignmentRequest $request): JsonResponse
    {
        $this->locationAssignmentService->createLocationAssignment($request->validated());

        return response()->json(['message' => 'Location assignment created successfully!'], 201);
    }

    // Update Location Assignment Method
    public function update(UpdateLocationAssignmentRequest $request, LocationAssignment $locationAssignment): JsonResponse
    {
        $updatedAssignment = $this->locationAssignmentService->updateLocationAssignment($locationAssignment, $request->validated());

        return response()->json($updatedAssignment, 200);
    }

    // Get All Location Assignments Method
    public function index(): JsonResponse
    {
        $assignments = $this->locationAssignmentService->getAllLocationAssignments();

        return response()->json($assignments, 200);
    }

    // Get Single Location Assignment Method
    public function show(LocationAssignment $locationAssignment): JsonResponse
    {
        return response()->json($locationAssignment, 200);
    }

    // Delete Location Assignment Method
    public function destroy(LocationAssignment $locationAssignment): JsonResponse
    {
        $this->locationAssignmentService->deleteLocationAssignment($locationAssignment);

        return response()->json(['message' => 'Location assignment deleted successfully!'], 200);
    }
}
