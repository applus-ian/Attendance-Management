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
    ) {
        $this->assignedScheduleService = $assignedScheduleService;
        $this->auditLogsService = $auditLogsService;
    }

    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
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

    public function store(AssignedSchedulesRequest $request): JsonResponse
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

    public function destroy(AssignedSchedules $assignedSchedule): JsonResponse
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

    public function getEmployeeSchedules(): JsonResponse
    {
        // Get the currently authenticated user
        $user = auth()->user();

        // Find the employee record associated with this user
        $employee = $user->employee;

        if (!$employee) {
            return response()->json([
                'success' => false,
                'message' => 'No employee record found for this user'
            ], 404);
        }

        // Get assigned schedules for this employee, including the schedule details
        $assignedSchedules = AssignedSchedules::where('emp_id', $employee->emp_id)
            ->with('schedule')
            ->get();

        // Format the data for the frontend
        $formattedSchedules = $assignedSchedules->map(function ($assignedSchedule) {
            $schedule = $assignedSchedule->schedule;

            return [
                'id' => $assignedSchedule->assigned_id,
                'title' => $schedule->title,
                'day' => $schedule->day,
                'start' => $schedule->start,
                'end' => $schedule->end,
                'date' => $assignedSchedule->assigned_at->toDateString(), // corrected to assigned_at
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $formattedSchedules
        ]);
    }
}
