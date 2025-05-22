<?php

namespace App\Services;

use App\Models\OfficeAssign;

class OfficeAssignService
{
    // Create Office Assign
    public function createOfficeAssign(array $data)
    {
        return OfficeAssign::create([
            'name' => $data['name']
        ]);
    }

    // Read (Get a single office by ID)
    public function getOfficeAssignById(int $id): ?OfficeAssign
    {
        return OfficeAssign::findOrFail($id);
    }

    // Read (Get all offices assign - will refactor for filters in the future)
    public function getAllOfficeAssigns()
    {
        return OfficeAssign::all();
    }

    // Update Office Assign
    public function updateOfficeAssign(OfficeAssign $office_assign, array $data)
    {
        $office_assign->update($data);
        return $office_assign;
    }

    // Delete Office Assign
    public function deleteOfficeAssign(OfficeAssign $office_assign): bool
    {
        return $office_assign->delete();
    }
}
