<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateEmployeeSkillRequest;
use App\Http\Requests\UpdateEmployeeSkillRequest;
use App\Models\EmployeeSkill;
use App\Services\EmployeeService;
use App\Services\EmployeeSkillService;
use Illuminate\Http\JsonResponse;

class EmployeeSkillController extends Controller
{
    protected $employeeSkillService, $employeeService;

    public function __construct(EmployeeSkillService $employeeSkillService, EmployeeService $employeeService)
    {
        $this->employeeSkillService = $employeeSkillService;
        $this->employeeService = $employeeService;
    }

    // Create Employee Skill Method
    public function create(CreateEmployeeSkillRequest $request): JsonResponse
    {
        $this->employeeSkillService->createEmployeeSkill($request->validated());

        return response()->json(['message' => 'The employee skill was created successfully.'], 201);
    }

    // Update Employee Skill Method
    public function update(UpdateEmployeeSkillRequest $request, EmployeeSkill $employeeSkill): JsonResponse
    {
        // Proceed with updating the employee skill's details
        $updated_employee_skill = $this->employeeSkillService->updateEmployeeSkill($employeeSkill, $request->validated());

        // Return the updated employee skill as a JSON response
        return response()->json($updated_employee_skill, 200);
    }

    // Get All Employee Skills Method
    public function index(): JsonResponse
    {
        $employee_skills = $this->employeeSkillService->getAllEmployeeSkills();

        return response()->json($employee_skills, 200);
    }

    // Get Single Employee Skills Method
    public function show($employee_id): JsonResponse
    {
        $decoded_id = $this->employeeService->decodeEmployeeId($employee_id);

        $employee_skills = $this->employeeSkillService->getEmployeeSkillsById($decoded_id);

        return response()->json($employee_skills, 200);
    }

    // Delete Employee Skilled Method
    public function destroy(EmployeeSkill $employeeSkill): JsonResponse
    {
        $this->employeeSkillService->deleteEmployeeSkill($employeeSkill);

        return response()->json(['message' => 'Employee skill has been deleted successfully!'], 200);
    }
}
