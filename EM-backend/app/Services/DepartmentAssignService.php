<?php

namespace App\Services;

use App\Http\Resources\DepartmentAssignResource;
use App\Models\DepartmentAssign;

class DepartmentAssignService
{
    // Create Department Assign
    public function createDepartmentAssign(array $data)
    {
        return DepartmentAssign::create([
            'name' => $data['name'],
            'parent_department_id' => $data['parent_department_id']
        ]);
    }

    // Read (Get a single Department by ID)
    public function getDepartmentAssignById(int $id): ?DepartmentAssign
    {
        return DepartmentAssign::findOrFail($id);
    }

    // Read (Get all Departments assign - will refactor for filters in the future)
    public function getAllDepartmentAssigns()
    {
        $departments = DepartmentAssign::all();
        return DepartmentAssignResource::collection($departments->load('parentDepartment'));
    }

    // Update Department Assign
    public function updateDepartmentAssign(DepartmentAssign $department_assign, array $data)
    {
        $department_assign->update($data);
        return $department_assign;
    }

    // Delete Department Assign
    public function deleteDepartmentAssign(DepartmentAssign $department_assign): bool
    {
        return $department_assign->delete();
    }
}
