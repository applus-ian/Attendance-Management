<?php

namespace App\Services;

use App\Models\Departments;

class DepartmentsService
{
    public function getAll()
    {
        return Departments::all();
    }

    public function create(array $data)
    {
        return Departments::create($data);
    }

    public function update(Departments $departments, array $data)
    {
        $departments->update($data);
        return $departments;
    }

    public function delete(Departments $departments)
    {
        $departments->delete();
    }
}
