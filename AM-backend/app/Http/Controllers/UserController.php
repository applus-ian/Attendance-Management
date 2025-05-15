<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Services\AuditLogsService;

class UserController extends Controller
{
    use AuthorizesRequests;

    protected $userService;
    protected $auditLogsService;

    public function __construct(UserService $userService, AuditLogsService $auditLogsService)
    {
        $this->userService = $userService;
        $this->auditLogsService = $auditLogsService;
    }

    public function index(): JsonResponse
    {
        $this->authorize('viewAny', User::class);
        $users = $this->userService->getAll();
        $this->auditLogsService->log('viewAny', 'User', null, 'Viewed all users');
        return response()->json($users);
    }

    public function store(UserRequest $request): JsonResponse
    {
        $this->authorize('create', User::class);
        $user = $this->userService->create($request->validated());
        $this->auditLogsService->log('create', 'User', $user->id, 'Created user');
        return response()->json($user, 201);
    }

    public function show($id): JsonResponse
    {
        $user = $this->userService->getById($id);
        $this->authorize('view', $user);
        $this->auditLogsService->log('view', 'User', $user->id, 'Viewed user');
        return response()->json($user);
    }

    public function update(UserRequest $request, $id): JsonResponse
    {
        $user = $this->userService->getById($id);
        $this->authorize('update', $user);
        $updatedUser = $this->userService->update($id, $request->validated());
        $this->auditLogsService->log('update', 'User', $user->id, 'Updated user');
        return response()->json($updatedUser);
    }

    public function destroy($id): JsonResponse
    {
        $user = $this->userService->getById($id);
        $this->authorize('delete', $user);
        $this->userService->delete($id);
        $this->auditLogsService->log('delete', 'User', $user->id, 'Deleted user');
        return response()->json(['message' => 'User deleted']);
    }
}
