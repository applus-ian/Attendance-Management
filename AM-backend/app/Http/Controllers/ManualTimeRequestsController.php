<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Employee;
use App\Models\ManualTimeRequests;
use App\Services\AuditLogsService;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ManualTimeRequest;
use App\Services\ManualTimeRequestService;
use App\Http\Resources\ManualTimeRequestResource;

class ManualTimeRequestsController extends Controller
{
    private ManualTimeRequestService $service;
    private AuditLogsService $auditLogsService;

    public function __construct(ManualTimeRequestService $service, AuditLogsService $auditLogsService)
    {
        $this->service = $service;
        $this->auditLogsService = $auditLogsService;
    }

    public function index()
    {
        /** @var User $user */
        $user = Auth::user();

        if (!$user->hasPermissionTo('view_all_request')) {
            return response()->json(['message' => 'Ops! Forbidden.'], 403);
        }

        $this->auditLogsService->log(
            action: 'View All Request',
            type: 'Manual Time Request',
            targetId: null,
            description: "View all Requests."
        );

        return ManualTimeRequestResource::collection(ManualTimeRequests::all());
    }

    public function store(ManualTimeRequest $request)
    {
        /** @var User $user */
        $user = Auth::user();

        if (!$user->hasPermissionTo('create_request')) {
            return response()->json(['message' => 'Ops! Forbidden.'], 403);
        }

        $manualRequest = $this->service->create($request);

        $this->auditLogsService->log(
            action: 'Submit Request',
            type: 'Manual Time Request',
            targetId: $manualRequest->request_id,
            description: $manualRequest->reason
        );

        return new ManualTimeRequestResource($manualRequest);
    }

    public function show(ManualTimeRequests $manualRequest)
    {
        /** @var User $user */
        $user = Auth::user();

        if (!$user->hasPermissionTo('view_request')) {
            return response()->json(['message' => 'Ops! Forbidden.'], 403);
        }

        $this->auditLogsService->log(
            action: 'View Specific Request',
            type: 'Manual Time Request',
            targetId: $manualRequest->request_id,
            description: 'View Specific Request.'
        );

        return new ManualTimeRequestResource($manualRequest);
    }

    public function approve(ManualTimeRequests $manualTimeRequest)
    {
        /** @var User $user */
        $user = Auth::user();
        /** @var Employee $employee */
        $employee = $user->employee;

        if (!$user->hasPermissionTo('approve_request')) {
            return response()->json(['message' => 'Ops! Forbidden.'], 403);
        }

        $updated = $this->service->approve($manualTimeRequest, $employee);

        $this->auditLogsService->log(
            action: 'Manual Request Approval',
            type: 'Manual Time Request',
            targetId: $manualTimeRequest->request_id,
            description: 'Request Approved.'
        );

        return new ManualTimeRequestResource($updated);
    }

    public function reject(ManualTimeRequests $manualTimeRequest)
    {
        /** @var User $user */
        $user = Auth::user();
        /** @var Employee $employee */
        $employee = $user->employee;

        if (!$user->hasPermissionTo('reject_request')) {
            return response()->json(['message' => 'Ops! Forbidden.'], 403);
        }

        $updated = $this->service->reject($manualTimeRequest, $employee);

        $this->auditLogsService->log(
            action: 'Manual Request Disapproval',
            type: 'Manual Time Request',
            targetId: $manualTimeRequest->request_id,
            description: 'Request Rejected.'
        );

        return new ManualTimeRequestResource($updated);
    }
}
