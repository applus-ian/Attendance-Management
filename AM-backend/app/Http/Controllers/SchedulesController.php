<?php

namespace App\Http\Controllers;

use App\Models\Schedules;
use App\Services\ScheduleService;
use App\Services\AuditLogsService;
use App\Http\Requests\ScheduleRequest;
use App\Http\Resources\ScheduleResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class SchedulesController extends Controller
{
    use AuthorizesRequests;

    public function __construct(protected ScheduleService $scheduleService, protected AuditLogsService $auditLogsService)
    {
        $this->scheduleService = $scheduleService;
        $this->auditLogsService = $auditLogsService;
    }

    public function index()
    {
        $this->authorize('viewAny', Schedules::class);

        $schedules = Schedules::all();
        $this->auditLogsService->log(
            action: 'View Schedules',
            type: 'Schedule',
            targetId: null,
            description: "View all Schedules"
        );
        return ScheduleResource::collection($schedules);
    }

    public function store(ScheduleRequest $request)
    {
        $this->authorize('create', Schedules::class);

        $schedule = $this->scheduleService->store($request->validated());
        $this->auditLogsService->log(
            action: 'Create Schedule',
            type: 'Schedule',
            targetId: $request->sched_id,
            description: "Create a Schedule"
        );
        return new ScheduleResource($schedule);
    }

    public function show(Schedules $schedules)
    {
        $this->authorize('view', $schedules);

        $this->auditLogsService->log(
            action: 'View Schedule',
            type: 'Schedule',
            targetId: $schedules->sched_id,
            description: "View a Schedule"
        );

        return new ScheduleResource($schedules);
    }


    public function update(ScheduleRequest $request, Schedules $schedules)
    {
        $this->authorize('update', $schedules);

        $updatedSchedule = $this->scheduleService->update($schedules, $request->validated());
        $this->auditLogsService->log(
            action: 'Edit Schedule',
            type: 'Schedule',
            targetId: $updatedSchedule->sched_id,
            description: "Update a schedule."
        );
        return new ScheduleResource($updatedSchedule);
    }


    public function destroy(Schedules $schedules)
    {
        $this->authorize('delete', $schedules);

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
