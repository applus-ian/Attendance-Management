<?php

namespace App\Http\Controllers;

use App\Models\AssignedSchedules;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Services\AssignedScheduleService;
use App\Http\Requests\AssignScheduleRequest;
use App\Http\Requests\AssignedSchedulesRequest;
use App\Http\Resources\AssignedScheduleResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\User;

class AssignedSchedulesController extends Controller
{
    use AuthorizesRequests;

    public function __construct(protected AssignedScheduleService $assignedScheduleService)
    {
        $this->assignedScheduleService = $assignedScheduleService;
    }

    public function index()
    {
        // $this->authorize('viewAny', AssignedSchedules::class);
        return AssignedScheduleResource::collection(AssignedSchedules::with(['schedule', 'employee', 'createdBy', 'updatedBy'])->get());
    }

    public function store(AssignedSchedulesRequest $request)
    {
        // $this->authorize('create', AssignedSchedules::class);
        /** @var User $user */
        $user = Auth::user();

        if (!$user->user_permissions()->contains('name', 'view_all_request')) {
            return response()->json(['message' => 'Ops! Forbidden.'], 403);
        }
        $schedule = $this->assignedScheduleService->assign($request->validated());
        return response()->json(new AssignedScheduleResource($schedule), 201);
    }

    public function update(AssignedSchedulesRequest $request, AssignedSchedules $assignedSchedule): JsonResponse
    {
        $updated = $this->assignedScheduleService->update($assignedSchedule, $request->validated());

        return response()->json(new AssignedScheduleResource($updated));
    }

    public function destroy(AssignedSchedules $assignedSchedule)
    {
        $this->assignedScheduleService->delete($assignedSchedule);

        return response()->json(['message' => 'Assignment deleted successfully.'], 200);
    }
}
