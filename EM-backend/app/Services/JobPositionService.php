<?php

namespace App\Services;

use App\Models\JobPosition;

class JobPositionService
{
    // Create Job Position
    public function createJobPosition(array $data)
    {
        return JobPosition::create( [
            'title' => $data['title'],
        ]);
    }

    // Read (Get a single job position by ID)
    public function getJobPositionById(int $id): ?JobPosition
    {
        return JobPosition::findOrFail($id);
    }

    // Read (Get all job positions - will refactor for filters in the future)
    public function getAllJobPositions()
    {
        return JobPosition::all();
    }

    // Update Job Position
    public function updateJobPosition(JobPosition $job_position, array $data)
    {
        $job_position->update($data);
        return $job_position;
    }

    // Delete Job Position
    public function deleteJobPosition(JobPosition $job_position): bool
    {
        return $job_position->delete();
    }
}
