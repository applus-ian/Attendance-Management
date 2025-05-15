<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\TimelogService;
use Illuminate\Http\JsonResponse;
use App\Services\AuditLogsService;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\TimelogRequest;

class TimelogsController extends Controller
{

    public function __construct(protected TimelogService $timelogService, protected AuditLogsService $auditLogsService)
    {
        $this->timelogService = $timelogService;
        $this->auditLogsService = $auditLogsService;
    }

    /**
     * Clock in an employee.
     */
    public function clockIn(TimelogRequest $request)
    {
        /** @var User $user */
        $user = Auth::user();

        // Manually check if the user has the 'create_timelog' permission
        if (!$user->user_permissions()->contains('name', 'create_timelog')) {
            return response()->json(['message' => 'Ops! Forbidden.'], 403);
        }

        $timelog = $this->timelogService->clockIn($request->validated());

        $this->auditLogsService->log(
            action: 'Clock In',
            type: 'Timelog',
            targetId: $timelog->timelog_id,
            description: 'Clocked in'
        );

        return response()->json([
            'message' => 'Clocked in successfully',
            'data' => $timelog,
        ], 201);
    }


    /**
     * Clock out an employee.
     */
    public function clockOut(TimelogRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();

        // Manually check if the user has the 'create_timelog' permission
        if (!$user->user_permissions()->contains('name', 'create_timelog')) {
            return response()->json(['message' => 'Ops! Forbidden.'], 403);
        }

        $timelog = $this->timelogService->clockIn($request->validated());


        $this->auditLogsService->log(
            action: 'Clock Out',
            type: 'Timelog',
            targetId: $timelog->timelog_id,
            description: 'Clocked out'
        );

        return response()->json([
            'message' => 'Clocked out successfully',
            'data' => $timelog,
        ], 201);
    }
}
