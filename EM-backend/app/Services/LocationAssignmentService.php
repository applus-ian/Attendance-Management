<?php

namespace App\Services;

use App\Http\Resources\LocationAssignmentResource;
use App\Models\LocationAssignment;

class LocationAssignmentService
{
    // Create Location Assignment
    public function createLocationAssignment(array $data)
    {
        return LocationAssignment::create([
            'job_position_id' => $data['job_position_id'],
            'country_assign_id' => $data['country_assign_id'],
            'office_assign_id' => $data['office_assign_id'],
            'team_assign_id' => $data['team_assign_id'],
            'department_assign_id' => $data['department_assign_id'],
        ]);
    }

    // Read (Get a single location assignment by ID)
    public function getLocationAssignmentById(int $id): ?LocationAssignment
    {
        return LocationAssignment::findOrFail($id);
    }

    // Read (Get all location assignments - will refactor for filters in the future)
    public function getAllLocationAssignments()
    {
        $location_assignments = LocationAssignment::all();

        return LocationAssignmentResource::collection($location_assignments->load('employee', 'jobPosition', 'countryAssign', 'officeAssign', 'teamAssign', 'departmentAssign'));
    }

    // Update Location Assignment
    public function updateLocationAssignment(LocationAssignment $location_assignment, array $data)
    {
        $location_assignment->update($data);
        return $location_assignment;
    }

    // Delete Location Assignment
    public function deleteLocationAssignment(LocationAssignment $location_assignment): bool
    {
        return $location_assignment->delete();
    }
}
