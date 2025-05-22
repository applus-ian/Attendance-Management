<?php

namespace App\Services;

use App\Http\Resources\EmployeeResource;
use App\Http\Resources\UserResource;
use App\Models\Documentation;
use App\Models\Employee;
use App\Models\EmployeeProject;
use App\Models\EmployeeSkill;
use App\Models\EmploymentStatusHistory;
use App\Models\User;
use Hashids\Hashids;

class EmployeeService
{
    // Create Employee
    public function createEmployee(array $data)
    {
        return Employee::create([
            'first_name' => $data['first_name'],
            'middle_name' => $data['middle_name'] ?? null,
            'last_name' => $data['last_name'],
            'suffix' => $data['suffix'] ?? null,
            'gender' => $data['gender'] ?? null,
            'birthdate' => $data['birthdate'],
            'civil_status' => $data['civil_status'],
            'nationality' => $data['nationality'],
            'region' => $data['region'],
            'province' => $data['province'],
            'city_or_municipality' => $data['city_or_municipality'],
            'barangay' => $data['barangay'],
            'street' => $data['street'],
            'phone_number' => $data['phone_number'],
            'emergency_contact1' => $data['emergency_contact1'],
            'emergency_contact2' => $data['emergency_contact2'],
            'email' => $data['email'],
            'job_position_id' => $data['job_position_id'],
            'date_hired' => $data['date_hired'],
            'employment_type_id' => $data['employment_type_id'],
            'manager_id' => $data['manager_id'] ?? null,
            'profile_pic_url' => $data['profile_pic_url'] ?? null,
            'tin_number' => $data['tin_number'],
            'sss_number' => $data['sss_number'],
            'pagibig_number' => $data['pagibig_number'],
            'philhealth_number' => $data['philhealth_number'],
            'bank_number' => $data['bank_number'],
        ]);
    }

    // Update Employee
    public function updateEmployee(Employee $employee, array $data)
    {
        $employee->update($data);
        return $employee;
    }


    // Find employee
    public function getEmployeeById(string $id)
    {
        $decoded_id = $this->decodeEmployeeId($id);
        $employee = User::findOrFail($decoded_id);
        return new UserResource(
            $employee->load([
                'employee',
                'employee.jobPosition',
                'employee.employmentType',
                'employee.manager',
                'employee.locationAssignment.countryAssign',
                'employee.locationAssignment.officeAssign',
                'employee.locationAssignment.teamAssign',
                'employee.locationAssignment.departmentAssign.parentDepartment',
                'roles',
            ])
        );

    }

    // Get all employees
    public function getAllEmployees()
    {
        $users = User::with([
            'employee',
            'employee.jobPosition',
            'employee.employmentType',
            'employee.manager',
            'employee.locationAssignment' => [
                'countryAssign',
                'officeAssign',
                'teamAssign',
                'departmentAssign.parentDepartment',
            ],
            'roles',
        ])->get();

        $projects = EmployeeProject::all();
        $skills = EmployeeSkill::all();
        $documentations = Documentation::all();
        $employeeStatus = EmploymentStatusHistory::all();

        return [
            'users' => UserResource::collection($users),
            'projects' => $projects,
            'skills' => $skills,
            'documentations' => $documentations,
            'employee_status' => $employeeStatus,
        ];
    }

    // Encode Employee ID
    public function encodeEmployeeId(string $employeeId): string
    {
        $hashids = new Hashids('', 7);

        return $hashids->encode($employeeId);
    }

    // Decode Employee ID
    public function decodeEmployeeId(string $encodedId): ?int // This function will return either an int or null.
    {
        $hashids = new Hashids('', 7);
        return $hashids->decode($encodedId)[0] ?? null; // output of decoding is always array
    }

    // Delete Employee
    public function deleteEmployee(Employee $employee): bool
    {
        return $employee->delete();
    }

}
