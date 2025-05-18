<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use App\Http\Resources\UserResource;
use App\Services\AuditLogsService;

class UserController extends Controller
{
    public function __construct(protected UserService $service, protected AuditLogsService $auditLogsService)
    {
        $this->authorizeResource(User::class, 'user');
    }

    public function index()
    {
        $this->authorize('viewAny', User::class);

        $this->auditLogsService->log(
            action: 'View All Users',
            type: 'User Management',
            targetId: null,
            description: "View all Users."
        );

        return UserResource::collection($this->service->getAllUsers());
    }

    public function show(User $user)
    {
        $this->authorize('view', $user);

        $this->auditLogsService->log(
            action: 'View User',
            type: 'User Management',
            targetId: $user->user_id,
            description: "View a User."
        );

        return new UserResource($user);
    }

    public function setActive(User $user)
    {
        $this->authorize('setActive', User::class);

        $this->auditLogsService->log(
            action: 'Set Active User',
            type: 'User Management',
            targetId: $user->user_id,
            description: "Set User as Active."
        );

        return new UserResource($this->service->setActive($user));
    }

    public function setInactive(User $user)
    {
        $this->authorize('setInactive', User::class);

        $this->auditLogsService->log(
            action: 'Set Inactive User',
            type: 'User Management',
            targetId: $user->user_id,
            description: "Set User as Inactive."
        );

        return new UserResource($this->service->setInactive($user));
    }

    public function destroy(User $user)
    {
        $this->authorize('delete', $user);
        $this->service->deleteUser($user);

        $this->auditLogsService->log(
            action: 'Delete a User',
            type: 'User Management',
            targetId: $user->user_id,
            description: "Delete an Inactive User."
        );

        return response()->json(['message' => 'User deleted successfully']);
    }
}
