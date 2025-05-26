<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function login(array $credentials)
    {
        if (!Auth::attempt($credentials)) {
            return response()
                ->json(['message' => 'Incorrect credentials!'], 401);
        }

        /** @var User $user */
        $user = Auth::user();

        // 🔒 Check if the user is inactive
        if (!$user->is_active) {
            // Logout immediately to clear any session
            Auth::logout();
            return response()->json([
                'message' => 'Your account is inactive. Please contact an administrator.'
            ], 403);
        }

        // ✅ Active user – continue login
        $token = $user->createToken('auth_token')->plainTextToken;
        $role = $user->getRoleNames();

        return [
            'user' => $user,
            'token' => $token,
            'role' => $role
        ];
    }

    public function logout($user)
    {
        $user->currentAccessToken()->delete();
        return ['message' => 'User logged out'];
    }

    public function me()
    {
        /** @var User $user */
        $user = Auth::user();

        return response()->json([
            'id' => $user->user_id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->getRoleNames()
        ]);
    }
}
