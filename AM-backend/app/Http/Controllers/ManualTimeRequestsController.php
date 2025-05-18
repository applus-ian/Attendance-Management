<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\ManualTimeRequests;
use App\Services\AuditLogsService;
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
        $this->authorize('viewAny', ManualTimeRequests::class);
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
        $this->authorize('create', ManualTimeRequests::class);

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
        $this->authorize('view', ManualTimeRequests::class);

        $this->auditLogsService->log(
            action: 'View Specific Request',
            type: 'Manual Time Request',
            targetId: $manualRequest->request_id,
            description: 'View Specific Request.'
        );

        return new ManualTimeRequestResource($manualRequest);
    }

    public function approve(ManualTimeRequests $manualTimeRequest, Employee $reviewer)
    {
        $this->authorize('approve', ManualTimeRequests::class);

        $updated = $this->service->approve($manualTimeRequest, $reviewer);

        $this->auditLogsService->log(
            action: 'Manual Request Approval',
            type: 'Manual Time Request',
            targetId: $manualTimeRequest->request_id,
            description: 'Request Approved.'
        );

        return new ManualTimeRequestResource($updated);
    }

    public function reject(ManualTimeRequests $manualTimeRequest, Employee $reviewer)
    {
        $this->authorize('reject', ManualTimeRequests::class);

        $updated = $this->service->reject($manualTimeRequest, $reviewer);

        $this->auditLogsService->log(
            action: 'Manual Request Disapproval',
            type: 'Manual Time Request',
            targetId: $manualTimeRequest->request_id,
            description: 'Request Rejected.'
        );

        return new ManualTimeRequestResource($updated);
    }
}
