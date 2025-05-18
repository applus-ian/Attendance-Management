<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class EMServiceAPI
{
    protected string $baseUrl;
    protected string $token;

    public function __construct()
    {
        $this->baseUrl = config('services.em_api.url');
        $this->token = config('services.em_api.token');
    }

    public function fetchEmployees()
    {
        return Http::withToken($this->token)
            ->get("{$this->baseUrl}/employees")
            ->json();
    }

    public function fetchEmployee($id)
    {
        return Http::withToken($this->token)
            ->get("{$this->baseUrl}/employees/{$id}")
            ->json();
    }
}
