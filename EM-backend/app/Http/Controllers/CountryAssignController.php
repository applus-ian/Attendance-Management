<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCountryAssignRequest;
use App\Http\Requests\UpdateCountryAssignRequest;
use App\Models\CountryAssign;
use App\Services\CountryAssignService;
use Illuminate\Http\JsonResponse;

class CountryAssignController extends Controller
{
    protected $countryAssignService;

    public function __construct(CountryAssignService $countryAssignService)
    {
        $this->countryAssignService = $countryAssignService;
    }

    // Create Country Assign Method
    public function create(CreateCountryAssignRequest $request): JsonResponse
    {
        $this->countryAssignService->createCountryAssign($request->validated());

        return response()->json(['message' => 'Country assignment created successfully!'], 201);
    }

    // Update Country Assign Method
    public function update(UpdateCountryAssignRequest $request, CountryAssign $countryAssign): JsonResponse
    {
        $updated_country_assign = $this->countryAssignService->updateCountryAssign($countryAssign, $request->validated());

        return response()->json($updated_country_assign, 200);
    }

    // Get All Country Assigns Method
    public function index(): JsonResponse
    {
        $countryAssigns = $this->countryAssignService->getAllCountryAssigns();

        return response()->json($countryAssigns, 200);
    }

    // Get Single Country Assign Method
    public function show(CountryAssign $countryAssign): JsonResponse
    {
        return response()->json($countryAssign, 200);
    }

    // Delete Country Assign Method
    public function destroy(CountryAssign $countryAssign): JsonResponse
    {
        $this->countryAssignService->deleteCountryAssign($countryAssign);

        return response()->json(['message' => 'Country assignment deleted successfully!'], 200);
    }
}
