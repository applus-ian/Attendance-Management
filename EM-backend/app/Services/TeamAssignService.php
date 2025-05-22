<?php

namespace App\Services;

use App\Models\TeamAssign;

class TeamAssignService
{
    // Create Team Assign
    public function createTeamAssign(array $data)
    {
        return TeamAssign::create([
            'name' => $data['name']
        ]);
    }

    // Read (Get a single team by ID)
    public function getTeamAssignById(int $id): ?TeamAssign
    {
        return TeamAssign::findOrFail($id);
    }

    // Read (Get all teams assign - will refactor for filters in the future)
    public function getAllTeamAssigns()
    {
        return TeamAssign::all();
    }

    // Update Team Assign
    public function updateTeamAssign(TeamAssign $team_assign, array $data)
    {
        $team_assign->update($data);
        return $team_assign;
    }

    // Delete Team Assign
    public function deleteTeamAssign(TeamAssign $team_assign): bool
    {
        return $team_assign->delete();
    }
}
