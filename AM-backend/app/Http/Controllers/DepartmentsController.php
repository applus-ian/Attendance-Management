<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use Illuminate\Http\Request;
use App\Services\DepartmentsService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DepartmentsController extends Controller
{
    use AuthorizesRequests;

    protected $departmentsService;

    public function __construct(DepartmentsService $departmentsService)
    {
        $this->departmentsService = $departmentsService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Departments::class);
        $departments = $this->departmentsService->getAll();
        return response()->json($departments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Departments::class);
        $validatedData = $request->validate([
            'dept_name' => 'required|string|max:255|unique:departments,dept_name',
            'manager_id' => 'nullable|exists:employees,emp_id',
        ]);

        $department = $this->departmentsService->create($validatedData);
        return response()->json($department, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Departments $departments)
    {
        $this->authorize('view', $departments);
        return response()->json($departments);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Departments $departments)
    {
        $this->authorize('update', $departments);
        $validatedData = $request->validate([
            'dept_name' => 'required|string|max:255|unique:departments,dept_name,' . $departments->dept_id,
            'manager_id' => 'nullable|exists:employees,emp_id',
        ]);

        $updatedDepartment = $this->departmentsService->update($departments, $validatedData);
        return response()->json($updatedDepartment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departments $departments)
    {
        $this->authorize('delete', $departments);
        $this->departmentsService->delete($departments);
        return response()->json(['message' => 'Department deleted']);
    }
}
