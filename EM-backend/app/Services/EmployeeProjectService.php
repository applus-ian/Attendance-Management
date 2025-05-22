<?php

namespace App\Services;

use App\Models\Employee;
use App\Models\EmployeeProject;


class EmployeeProjectService
{
    protected $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    // Create Employee Project
    public function createEmployeeProject($project, array $employees): void
    {
        foreach ($employees as $employee) {
            $decodedId = $this->employeeService->decodeEmployeeId($employee['id']);

            // Validate the decoded employee ID
            if (!$decodedId || !Employee::find($decodedId)) {
                throw new \Exception("Invalid employee ID: {$employee['id']}");
            }

            // Create an entry in the employee_projects table
            EmployeeProject::create([
                'employee_id' => $decodedId,
                'project_id' => $project->id,
                'project_role_id' => $employee['project_role_id'],
                'start_date' => $project->start_date ?? null,
                'end_date' => $project->end_date ?? null,
            ]);
        }
    }

    // Read (Get a single employee project by ID)
    public function getEmployeeProjectById(int $id): ?EmployeeProject
    {
        return EmployeeProject::findOrFail($id);
    }

    // Read (Get all employee projects - will refactor for filters in the future)
    public function getAllEmployeeProjects()
    {
        return EmployeeProject::all();
    }

    // Update Employee Project
    public function updateEmployeeProject(EmployeeProject $employee_project, array $data)
    {
        $employee_project->update($data);
        return $employee_project;
    }

    // Delete Employee Project
    public function deleteEmployeeProject(EmployeeProject $employee_project): bool
    {
        return $employee_project->delete();
    }
}
