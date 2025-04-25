<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    // Login Method
    public function login(LoginRequest $request): JsonResponse
    {
        $authData = $this->authService->loginUser($request->validated());

        if(!$authData){
            abort(401, 'Invalid crendentials'); // Cleaner than manually returning JSON
        }

        return response()->json([
            'message' => 'Login successful',
            'token' => $authData['token'],
            'user' => [
                'name' => $authData['user']->name, // name for now
            ]
        ]);
    }

    // Logout Method
    public function logout(Request $request): JsonResponse
    {
        $this->authService->logoutUser($request->user());

        return response()->json(['message' => 'Logged out successfully']);
    }

    // Fetch User Method
    public function fetchUser(): JsonResponse
    {
        return response()->json(Auth::user());
    }

    // Method to validate the token
    public function validateToken(Request $request)
    {
        $isValid = $this->authService->checkToken($request->bearerToken());

        return response()->json([
            'isValid' => $isValid,
        ]);
    }
}
