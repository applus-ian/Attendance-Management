<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOfficeAssignRequest;
use App\Http\Requests\UpdateOfficeAssignRequest;
use App\Models\OfficeAssign;
use App\Services\OfficeAssignService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OfficeAssignController extends Controller
{
    protected $officeAssignService;

    public function __construct(OfficeAssignService $officeAssignService)
    {
        $this->officeAssignService = $officeAssignService;
    }

    // Create Office Assign Method
    public function create(CreateOfficeAssignRequest $request): JsonResponse
    {
        $this->officeAssignService->createOfficeAssign($request->validated());

        return response()->json(['message' => 'Office created successfully!'], 201);
    }

    // Update Office Assign Method
    public function update(UpdateOfficeAssignRequest $request, OfficeAssign $officeAssign): JsonResponse
    {
        // Proceed with updating the assigned office's details
        $updated_office_assign = $this->officeAssignService->updateOfficeAssign($officeAssign, $request->validated());

        // Return the updated assigned office as a JSON response
        return response()->json($updated_office_assign, 200);
    }

    // Get All Offices Assigned Method
    public function index(): JsonResponse
    {
        $office_assigns = $this->officeAssignService->getAllOfficeAssigns();

        return response()->json($office_assigns, 200);
    }

    // Get Single Office Assigned Method
    public function show(OfficeAssign $officeAssign): JsonResponse
    {
        return response()->json($officeAssign, 200);
    }

    // Delete Office Assigned Method
    public function destroy(OfficeAssign $officeAssign): JsonResponse
    {
        $this->officeAssignService->deleteOfficeAssign($officeAssign);

        return response()->json(['message' => 'Assigned Office deleted successfully!'], 200);
    }
}
