<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordChangeRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Services\EmploymentStatusHistoryService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    protected $userService, $employmentStatusHistoryService;

    public function __construct(UserService $userService, EmploymentStatusHistoryService $employmentStatusHistoryService)
    {
        $this->userService = $userService;
        $this->employmentStatusHistoryService = $employmentStatusHistoryService;
    }

    // Create New User Account for Employee
    public function register(RegisterUserRequest $request):JsonResponse
    {
        $new_user = $this->userService->registerUser($request->validated());

        $this->employmentStatusHistoryService->createEmploymentStatusHistory($new_user->id, 'user_created',$new_user->created_at);

        return response()->json(['message' => 'User registered successfully!'], 201);
    }

    // Change Password
    public function changePassword(PasswordChangeRequest $request): JsonResponse
    {
        try {
            $user = Auth::user(); // Authenticated user
            $updatedUser = $this->userService->changeUserPassword(
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

}
