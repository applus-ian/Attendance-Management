<?php

namespace App\Services;

use App\Models\EmployeeAddress;

class EmployeeAddressService
{
    public function getAll()
    {
        return EmployeeAddress::all();
    }

    public function create(array $data)
    {
        return EmployeeAddress::create($data);
    }

    public function update(EmployeeAddress $employeeAddress, array $data)
    {
        $employeeAddress->update($data);
        return $employeeAddress;
    }

    public function delete(EmployeeAddress $employeeAddress)
    {
        $employeeAddress->delete();
    }
}
