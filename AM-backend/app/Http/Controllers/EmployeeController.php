<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeRequest;
use App\Services\EmployeeService;
use Illuminate\Http\JsonResponse;

class EmployeeController extends Controller
{
    protected $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index(): JsonResponse
    {
        $employees = $this->employeeService->getAll();
        return response()->json($employees);
    }

    public function store(EmployeeRequest $request): JsonResponse
    {
        $employee = $this->employeeService->create($request->validated());
        return response()->json($employee, 201);
    }

    public function show($id): JsonResponse
    {
        $employee = $this->employeeService->getById($id);
        return response()->json($employee);
    }

    public function update(EmployeeRequest $request, $id): JsonResponse
    {
        $employee = $this->employeeService->update($id, $request->validated());
        return response()->json($employee);
    }

    public function destroy($id): JsonResponse
    {
        $this->employeeService->delete($id);
        return response()->json(['message' => 'Employee deleted']);
    }
}
