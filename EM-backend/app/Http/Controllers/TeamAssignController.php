<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTeamAssignRequest;
use App\Http\Requests\UpdateTeamAssignRequest;
use App\Models\TeamAssign;
use App\Services\TeamAssignService;
use Illuminate\Http\JsonResponse;

class TeamAssignController extends Controller
{
    protected $teamAssignService;

    public function __construct(TeamAssignService $teamAssignService)
    {
        $this->teamAssignService = $teamAssignService;
    }

    // Create Team Assign Method
    public function create(CreateTeamAssignRequest $request): JsonResponse
    {
        $this->teamAssignService->createTeamAssign($request->validated());

        return response()->json(['message' => 'Team created successfully!'], 201);
    }

    // Update Team Assign Method
    public function update(UpdateTeamAssignRequest $request, TeamAssign $teamAssign): JsonResponse
    {
        // Proceed with updating the assigned team's details
        $updated_team_assign = $this->teamAssignService->updateTeamAssign($teamAssign, $request->validated());

        // Return the updated assigned team as a JSON response
        return response()->json($updated_team_assign, 200);
    }

    // Get All Teams Assigned Method
    public function index(): JsonResponse
    {
        $team_assigns = $this->teamAssignService->getAllTeamAssigns();

        return response()->json($team_assigns, 200);
    }

    // Get Single Team Assigned Method
    public function show(TeamAssign $teamAssign): JsonResponse
    {
        return response()->json($teamAssign, 200);
    }

    // Delete Team Assigned Method
    public function destroy(TeamAssign $teamAssign): JsonResponse
    {
        $this->teamAssignService->deleteTeamAssign($teamAssign);

        return response()->json(['message' => 'Assigned Team deleted successfully!'], 200);
    }
}
