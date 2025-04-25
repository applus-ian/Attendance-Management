<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function loginUser(array $credentials)
    {
        $user = User::where('email', $credentials['email'])->first();

        if(!$user || !Hash::check($credentials['password'], $user->password)){
            return null;
        }

        $token = $user->createToken('LoggedUser')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function logoutUser($user)
    {
        $user->currentAccessToken()->delete();

        return true;
    }

    public function checkToken($token)
    {
        if(!$token){
            return response()->json(['isValid' => false], 400); // No token provided
        }

        try{
            $user = Auth::guard('api')->user(); // Will return null if token is invalid or expired

            if ($user) {
                return response()->json(['isValid' => true]); // Token is valid
            } else {
                return response()->json(['isValid' => false]); // Token is invalid
            }
        } catch (\Exception $e) {
            return response()->json(['isValid' => false], 500); // Token validation failed
        }
    }
}
