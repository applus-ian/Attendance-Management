<?php

namespace App\Services;

use App\Models\CountryAssign;

class CountryAssignService
{
    // Create Country Assign
    public function createCountryAssign(array $data)
    {
        return CountryAssign::create([
            'name' => $data['name']
        ]);
    }

    // Read (Get a single country assign by ID)
    public function getCountryAssignById(int $id): ?CountryAssign
    {
        return CountryAssign::findOrFail($id);
    }

    // Read (Get all country assigns - will refactor for filters in the future)
    public function getAllCountryAssigns()
    {
        return CountryAssign::all();
    }

    // Update Country Assign
    public function updateCountryAssign(CountryAssign $country_assign, array $data)
    {
        $country_assign->update($data);
        return $country_assign;
    }

    // Delete Country Assign
    public function deleteCountryAssign(CountryAssign $country_assign): bool
    {
        return $country_assign->delete();
    }
}
