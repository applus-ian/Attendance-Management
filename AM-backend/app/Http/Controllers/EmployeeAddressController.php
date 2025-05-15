<?php

namespace App\Http\Controllers;

use App\Models\EmployeeAddress;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Services\EmployeeAddressService;
use App\Http\Resources\EmployeeAddressResource;

class EmployeeAddressController extends Controller
{
    use AuthorizesRequests;

    protected $employeeAddressService;

    public function __construct(EmployeeAddressService $employeeAddressService)
    {
        $this->employeeAddressService = $employeeAddressService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', EmployeeAddress::class);
        $employeeAddresses = $this->employeeAddressService->getAll();
        return EmployeeAddressResource::collection($employeeAddresses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', EmployeeAddress::class);
        $validatedData = $request->validate([
            'province' => 'required|string|max:255',
            'city_or_municipality' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'postal_code' => 'required|string|max:10',
        ]);

        $employeeAddress = $this->employeeAddressService->create($validatedData);
        return (new EmployeeAddressResource($employeeAddress))->response()->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(EmployeeAddress $employeeAddress)
    {
        $this->authorize('view', $employeeAddress);
        return new EmployeeAddressResource($employeeAddress);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EmployeeAddress $employeeAddress)
    {
        $this->authorize('update', $employeeAddress);
        $validatedData = $request->validate([
            'province' => 'required|string|max:255',
            'city_or_municipality' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'postal_code' => 'required|string|max:10',
        ]);

        $updatedEmployeeAddress = $this->employeeAddressService->update($employeeAddress, $validatedData);
        return new EmployeeAddressResource($updatedEmployeeAddress);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmployeeAddress $employeeAddress)
    {
        $this->authorize('delete', $employeeAddress);
        $this->employeeAddressService->delete($employeeAddress);
        return response()->json(['message' => 'Employee address deleted']);
    }
}
