<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Http\Requests\AuthRequest;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(AuthRequest $request)
    {
        $data = $this->authService->login($request->validated());

        return response()->json($data, 200);
    }

    public function logout(Request $request)
    {
        $data = $this->authService->logout($request->user());
        return response()->json($data, 200);
    }

    public function me(Request $request)
    {
        $data = $this->authService->me();
        return response()->json($data, 200);
    }
}
