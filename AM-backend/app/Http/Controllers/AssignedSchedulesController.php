<?php

namespace App\Http\Controllers;

use App\Models\AssignedSchedules;
use Illuminate\Http\JsonResponse;
use App\Services\AssignedScheduleService;
use App\Http\Requests\AssignedSchedulesRequest;
use App\Http\Resources\AssignedScheduleResource;
use App\Services\AuditLogsService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class AssignedSchedulesController extends Controller
{
    use AuthorizesRequests;

    public function __construct(
        protected AssignedScheduleService $assignedScheduleService,
        protected AuditLogsService $auditLogsService
    ) {}

    public function index()
    {
        $this->authorize('viewAny', AssignedSchedules::class);

        $this->auditLogsService->log(
            action: 'View All Assigned Schedules',
            type: 'Assigned Schedules',
            targetId: null,
            description: "View all Assigned Schedules."
        );

        return AssignedScheduleResource::collection(
            AssignedSchedules::with(['schedule', 'employee', 'createdBy', 'updatedBy'])->get()
        );
    }

    public function store(AssignedSchedulesRequest $request)
    {
        $this->authorize('create', AssignedSchedules::class);

        $schedule = $this->assignedScheduleService->assign($request->validated());

        $this->auditLogsService->log(
            action: 'Assigned Schedule',
            type: 'Assigned Schedules',
            targetId: $schedule->assigned_id,
            description: "Assigned a Schedule."
        );

        return response()->json(new AssignedScheduleResource($schedule), 201);
    }

    public function update(AssignedSchedulesRequest $request, AssignedSchedules $assignedSchedule): JsonResponse
    {
        $this->authorize('update', $assignedSchedule);

        $updated = $this->assignedScheduleService->update($assignedSchedule, $request->validated());

        $this->auditLogsService->log(
            action: 'Update Assigned Schedule',
            type: 'Assigned Schedules',
            targetId: $updated->assigned_id,
            description: "Update Assigned Schedule."
        );

        return response()->json(new AssignedScheduleResource($updated));
    }

    public function destroy(AssignedSchedules $assignedSchedule)
    {
        $this->authorize('delete', $assignedSchedule);

        $this->assignedScheduleService->delete($assignedSchedule);

        $this->auditLogsService->log(
            action: 'Remove Assigned Schedule',
            type: 'Assigned Schedules',
            targetId: $assignedSchedule->assigned_id,
            description: "Removed Assigned Schedule."
        );

        return response()->json(['message' => 'Assignment deleted successfully.'], 200);
    }
}
