<?php

namespace App\Http\Controllers;

use App\Models\Timelogs;
use App\Services\TimelogService;
use Illuminate\Http\JsonResponse;
use App\Services\AuditLogsService;
use App\Http\Requests\TimelogRequest;
use App\Http\Resources\TimelogResource;

class TimelogsController extends Controller
{

    public function __construct(protected TimelogService $timelogService, protected AuditLogsService $auditLogsService)
    {
        $this->timelogService = $timelogService;
        $this->auditLogsService = $auditLogsService;
    }

    public function index()
    {
        $this->authorize('viewAny', Timelogs::class);

        $timelogs = Timelogs::all();

        $this->auditLogsService->log(
            action: 'View timelogs',
            type: 'Timelog',
            targetId: null,
            description: 'View all timelogs'
        );
        return TimelogResource::collection($timelogs);
    }

    public function show(Timelogs $timelogs)
    {
        $this->authorize('view', $timelogs);

        $this->auditLogsService->log(
            action: 'View a timelog',
            type: 'Timelog',
            targetId: $timelogs->timelog_id,
            description: 'View a timelog'
        );

        return new TimelogResource($timelogs);
    }

    public function clockIn(TimelogRequest $request)
    {
        $this->authorize('clockIn', Timelogs::class);

        $timelog = $this->timelogService->clockIn($request->validated());

        $this->auditLogsService->log(
            action: 'Clock In',
            type: 'Timelog',
            targetId: $timelog->timelog_id,
            description: 'Clocked in'
        );

        return response()->json([
            'message' => 'Clocked in successfully',
            'data' => new TimelogResource($timelog),
        ], 201);
    }

    public function clockOut(TimelogRequest $request, Timelogs $timelogs): JsonResponse
    {
        $this->authorize('clockOut', $timelogs);

        $timelog = $this->timelogService->clockOut($request->validated());

        $this->auditLogsService->log(
            action: 'Clock Out',
            type: 'Timelog',
            targetId: $timelog->timelog_id,
            description: 'Clocked out'
        );

        return response()->json([
            'message' => 'Clocked out successfully',
            'data' => new TimelogResource($timelog),
        ], 201);
    }

    public function getCurrentStatus()
    {
        // Get the currently authenticated user
        $user = auth()->user();

        if (!$user || !$user->employee) {
            return response()->json([
                'success' => false,
                'message' => 'User is not associated with an employee record'
            ], 404);
        }

        $employee = $user->employee;
        $today = \Carbon\Carbon::now()->toDateString();

        // Check if there's a clock-in record for today without a corresponding clock-out
        $latestTimelog = Timelogs::where('emp_id', $employee->emp_id)
            ->whereDate('time', $today)
            ->latest('time')
            ->first();

        $status = 'clocked_out'; // Default status

        if ($latestTimelog && $latestTimelog->timelog_type === 'clock_in') {
            $status = 'clocked_in';
        }

        return response()->json([
            'success' => true,
            'status' => $status,
            'last_activity' => $latestTimelog ? $latestTimelog->time : null
        ]);
    }
}
