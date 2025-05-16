<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function __construct(protected UserService $service)
    {
        $this->authorizeResource(User::class, 'user');
    }

    public function index()
    {
        $this->authorize('viewAny', User::class);
        return UserResource::collection($this->service->getAllUsers());
    }

    public function show(User $user)
    {
        $this->authorize('view', $user);
        return new UserResource($user);
    }

    public function setActive(User $user)
    {
        $this->authorize('setActive', User::class);
        return new UserResource($this->service->setActive($user));
    }

    public function setInactive(User $user)
    {
        $this->authorize('setInactive', User::class);
        return new UserResource($this->service->setInactive($user));
    }

    public function destroy(User $user)
    {
        $this->authorize('delete', $user);
        $this->service->deleteUser($user);
        return response()->json(['message' => 'User deleted successfully']);
    }
}
