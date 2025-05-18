<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRolePermission
{
    public function handle(Request $request, Closure $next, $roles = null, $permission = null)
    {
        $user = $request->user();

        if ($roles) {
            $rolesArray = explode(',', $roles);
            if (!$user->hasRole($rolesArray)) {
                return response()->json(['message' => 'Forbidden: Insufficient role'], 403);
            }
        }

        if ($permission && !$user->hasPermission($permission)) {
            return response()->json(['message' => 'Forbidden: Insufficient permission'], 403);
        }

        return $next($request);
    }
}
