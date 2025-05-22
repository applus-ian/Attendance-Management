<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateJobPositionRequest;
use App\Http\Requests\UpdateJobPositionRequest;
use App\Models\JobPosition;
use App\Services\JobPositionService;
use Illuminate\Http\JsonResponse;

class JobPositionController extends Controller
{
    protected $jobPositionService;

    public function __construct(JobPositionService $jobPositionService)
    {
        $this->jobPositionService = $jobPositionService;
    }

    // Create Job Position Method
    public function create(CreateJobPositionRequest $request): JsonResponse
    {
        $this->jobPositionService->createJobPosition($request->validated());

        return response()->json(['message' => 'Job position created successfully!'], 201);
    }

    // Update Job Position Method
    public function update(UpdateJobPositionRequest $request, JobPosition $jobPosition): JsonResponse
    {
        $updatedJobPosition = $this->jobPositionService->updateJobPosition($jobPosition, $request->validated());

        return response()->json($updatedJobPosition, 200);
    }

    // Get All Job Positions Method
    public function index(): JsonResponse
    {
        $positions = $this->jobPositionService->getAllJobPositions();

        return response()->json($positions, 200);
    }

    // Get Single Job Position Method
    public function show(JobPosition $jobPosition): JsonResponse
    {
        return response()->json($jobPosition, 200);
    }

    // Delete Job Position Method
    public function destroy(JobPosition $jobPosition): JsonResponse
    {
        $this->jobPositionService->deleteJobPosition($jobPosition);

        return response()->json(['message' => 'Job position deleted successfully!'], 200);
    }
}
