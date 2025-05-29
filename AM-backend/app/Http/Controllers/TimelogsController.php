<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Timelogs;
use App\Services\TimelogService;
use Illuminate\Http\JsonResponse;
use App\Services\AuditLogsService;
use Illuminate\Support\Facades\Auth;
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

        $query = Timelogs::query();
        if (request()->has('emp_id')) {
            $query->where('emp_id', request('emp_id'));
        }
        $timelogs = $query->get();

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

    public function store(TimelogRequest $request)
    {
        $this->authorize('create', Timelogs::class);
        $data = $request->validated();
        $timelog = $this->timelogService->createTimelog($data);
        $this->auditLogsService->log(
            action: 'Add Timelog',
            type: 'Timelog',
            targetId: $timelog->timelog_id,
            description: 'Added a timelog via super-admin.'
        );
        return response()->json([
            'message' => 'Timelog created successfully',
            'data' => new TimelogResource($timelog),
        ], 201);
    }

    public function update(TimelogRequest $request, Timelogs $timelog)
    {
        $this->authorize('update', $timelog);
        $data = $request->validated();
        $timelog->update($data);
        $this->auditLogsService->log(
            action: 'Update Timelog',
            type: 'Timelog',
            targetId: $timelog->timelog_id,
            description: 'Updated a timelog via super-admin.'
        );
        return response()->json([
            'message' => 'Timelog updated successfully',
            'data' => new TimelogResource($timelog),
        ]);
    }

    public function destroy(Timelogs $timelog)
    {
        $this->authorize('delete', $timelog);
        $timelog->delete();
        $this->auditLogsService->log(
            action: 'Delete Timelog',
            type: 'Timelog',
            targetId: $timelog->timelog_id,
            description: 'Deleted a timelog via super-admin.'
        );
        return response()->json([
            'message' => 'Timelog deleted successfully',
        ]);
    }

    public function getCurrentStatus()
    {   
        $user = Auth::user();

        if (!$user || !$user->employee) {
            return response()->json([
                'success' => false,
                'message' => 'User is not associated with an employee record'
            ], 404);
        }

        $employee = User::where('user_id', $user->user_id)->first();
        $today = Carbon::now()->toDateString();

        $clockIn = Timelogs::where('emp_id', $employee->emp_id)
            ->whereDate('time', $today)
            ->where('timelog_type', 'clock_in')
            ->orderBy('time', 'desc')->first();

        $clockOut = Timelogs::where('emp_id', $employee->emp_id)
            ->whereDate('time', $today)
            ->where('timelog_type', 'clock_out')
            ->orderBy('time', 'desc')
            ->first();

        $allLogs = Timelogs::where('emp_id', $employee->emp_id)
            ->whereDate('time', $today)
            ->get();

        $status = 'clocked_out';
        $last_activity = null;

        if ($clockIn && (!$clockOut || $clockIn->time > $clockOut->time)) {
            $status = 'clocked_in';
            $last_activity = $clockIn->time;
        } elseif ($clockOut) {
            $last_activity = $clockOut->time;
        }

        return response()->json([
            'success' => true,
            'status' => $status,
            'last_activity' => $last_activity,
            'debug_timelogs' => $allLogs,
            'debug_emp_id' => $employee->emp_id,
            'debug_today' => $today
        ]);
    }
}
