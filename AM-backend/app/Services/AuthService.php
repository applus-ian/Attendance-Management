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
                ->json(['message' => 'Incorrect Password!'], 401);
        }

        // $user = User::where('email', $credentials['email'])->first();
        /** @var User $user */
        $user = Auth::user();

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
            'emp_id' => $user->emp_id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->getRoleNames()
        ]);
    }
}
