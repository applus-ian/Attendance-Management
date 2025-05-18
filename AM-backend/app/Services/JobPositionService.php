<?php

namespace App\Services;

use App\Models\JobPosition;

class JobPositionService
{
    public function getAll()
    {
        return JobPosition::all();
    }

    public function create(array $data)
    {
        return JobPosition::create($data);
    }

    public function update(JobPosition $jobPosition, array $data)
    {
        $jobPosition->update($data);
        return $jobPosition;
    }

    public function delete(JobPosition $jobPosition)
    {
        $jobPosition->delete();
    }
}
