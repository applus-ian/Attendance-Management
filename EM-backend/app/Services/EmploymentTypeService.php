<?php

namespace App\Services;

use App\Models\EmploymentType;

class EmploymentTypeService
{
    // Create Employment Type
    public function createEmploymentType(array $data)
    {
        return EmploymentType::create( [
            'name' => $data['name'],
        ]);
    }

    // Read (Get a single employment type by ID)
    public function getEmploymentTypeById(int $id): ?EmploymentType
    {
        return EmploymentType::findOrFail($id);
    }

    // Read (Get all employment types - will refactor for filters in the future)
    public function getAllEmploymentTypes()
    {
        return EmploymentType::all();
    }

    // Update Employment Type
    public function updateEmploymentType(EmploymentType $employment_type, array $data)
    {
        $employment_type->update($data);
        return $employment_type;
    }

    // Delete Employment Type
    public function deleteEmploymentType(EmploymentType $employment_type): bool
    {
        return $employment_type->delete();
    }
}
