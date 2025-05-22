<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\PasswordChangeRequest;
use App\Http\Requests\UpdateGovBankNumbersRequest;
use App\Http\Requests\UpdatePersonalInfoRequest;
use App\Http\Requests\UpdateResidentialInfoRequest;
use App\Services\AuthService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    protected $authService, $userService;

    public function __construct(AuthService $authService, UserService $userService)
    {
        $this->authService = $authService;
        $this->userService = $userService;
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
            'user' => $authData['user'],
            'employee' => $authData['employee'],
        ]);
    }

    // Logout Method
    public function logout(Request $request): JsonResponse
    {
        $this->authService->logoutUser($request->user());

        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    // Fetch User Method
    public function fetchUser(): JsonResponse
    {
        $user = $this->userService->fetchUser();
        return response()->json($user, 200);
    }

    // Method to validate the token
    public function validateToken(Request $request)
    {
        $isValid = $this->authService->checkToken($request->bearerToken());

        if ($isValid) {
            return response()->json(['isValid' => $isValid], 200);
        } else {
            return response()->json(['isValid' => $isValid], 401);
        }
    }

    // Change Password
    public function changeOwnPassword(PasswordChangeRequest $request): JsonResponse
    {
        try {
            $user = Auth::user(); // Authenticated user
            $updatedUser = $this->authService->changeLoggedUserPassword(
                $user,
                $request->input('new_password')
            );

            return response()->json([
                'message' => 'Password changed successfully.',
                'user' => $updatedUser,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to change password.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    // Update Own Personal Info
    public function updateOwnPersonalInfo(UpdatePersonalInfoRequest $request): JsonResponse
    {
        try {
            $user = Auth::user()->load('employee'); // Authenticated user
            $updatedUser = $this->authService->updateLoggedUserPersonalInfo(
                $user->employee,
                $request->validated()
            );

            return response()->json([
                'message' => 'Personal Information Updated.',
                'user' => $updatedUser,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to update personal information.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    // Update Own Residential Info
    public function updateOwnResidentialInfo(UpdateResidentialInfoRequest $request): JsonResponse
    {
        try {
            $user = Auth::user()->load('employee'); // Authenticated user
            $updatedUser = $this->authService->updateLoggedUserResidentialInfo(
                $user->employee,
                $request->validated()
            );

            return response()->json([
                'message' => 'Residential Information Updated.',
                'user' => $updatedUser,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to update residential information.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    // Update Own Government and Bank Numbers
    public function updateOwnGovBankNumbers(UpdateGovBankNumbersRequest $request): JsonResponse
    {
        try {
            $user = Auth::user()->load('employee'); // Authenticated user
            $updatedUser = $this->authService->updateLoggedUserGovBankNumbers(
                $user->employee,
                $request->validated()
            );

            return response()->json([
                'message' => 'Government and Bank Numbers Updated.',
                'user' => $updatedUser,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to update government and bank numbers.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
