<?php

namespace App\Services;

use App\Models\Employee;

class EmployeeService
{
    public function getAll()
    {
        return Employee::with(['user', 'department', 'jobPosition', 'address'])->get();
    }

    public function create(array $data)
    {
        return Employee::create($data);
    }

    public function getById($id)
    {
        return Employee::with(['user', 'department', 'jobPosition', 'address'])->findOrFail($id);
    }

    public function update($id, array $data)
    {
        $employee = Employee::findOrFail($id);
        $employee->update($data);
        return $employee;
    }

    public function delete($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();
        return $employee;
    }
}
