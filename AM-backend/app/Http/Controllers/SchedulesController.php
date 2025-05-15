<?php

namespace App\Http\Controllers;

use App\Models\Schedules;
use App\Services\ScheduleService;
use App\Services\AuditLogsService;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ScheduleRequest;
use App\Http\Resources\ScheduleResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class SchedulesController extends Controller
{
    use AuthorizesRequests;

    protected $service;
    protected $auditLogsService;

    public function __construct(ScheduleService $service, AuditLogsService $auditLogsService)
    {
        $this->service = $service;
        $this->auditLogsService = $auditLogsService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Schedules::class);
        $schedules = Schedules::all();
        $this->auditLogsService->log('viewAny', 'Schedule', null, 'Viewed all schedules');
        return ScheduleResource::collection($schedules);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ScheduleRequest $request)
    {
        // $this->authorize('create', Schedules::class);
        /** @var User $user */
        $user = Auth::user();

        if (!$user->user_permissions()->contains('name', 'view_all_request')) {
            return response()->json(['message' => 'Ops! Forbidden.'], 403);
        }
        $schedule = $this->service->store($request->validated());
        $this->auditLogsService->log(
            action: 'Create Schedule',
            type: 'Schedule',
            targetId: $request->sched_id,
            description: "Create a Schedule"
        );
        return new ScheduleResource($schedule);
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedules $schedules)
    {
        $this->authorize('view', $schedules);
        $this->auditLogsService->log('view', 'Schedule', $schedules->id, 'Viewed schedule');
        return new ScheduleResource($schedules);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(ScheduleRequest $request, Schedules $schedules)
    {
        // $this->authorize('update', $schedules);
        /** @var User $user */
        $user = Auth::user();

        if (!$user->user_permissions()->contains('name', 'update_schedule')) {
            return response()->json(['message' => 'Ops! Forbidden.'], 403);
        }
        $updatedSchedule = $this->service->update($schedules, $request->validated());
        $this->auditLogsService->log(
            action: 'Edit Schedule',
            type: 'Schedule',
            targetId: $updatedSchedule->sched_id,
            description: "Update a schedule."
        );
        return new ScheduleResource($updatedSchedule);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedules $schedules)
    {
        /** @var User $user */
        $user = Auth::user();

        if (!$user->user_permissions()->contains('name', 'update_schedule')) {
            return response()->json(['message' => 'Ops! Forbidden.'], 403);
        }

        $schedules->delete();
        $this->auditLogsService->log(
            action: 'Delete Schedule',
            type: 'Schedule',
            targetId: $schedules->sched_id,
            description: "Delete a schedule."
        );
        return response()->json(['message' => 'Schedule has been deleted successfully.']);
    }
}
