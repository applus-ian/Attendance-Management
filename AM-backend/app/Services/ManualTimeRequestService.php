<?php

namespace App\Services;

use App\Models\User;
use App\Models\Employee;
use App\Models\ManualTimeRequests;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ManualTimeRequest;
use App\Http\Resources\ManualTimeRequestResource;

class ManualTimeRequestService
{

    public function create(ManualTimeRequest $request): ManualTimeRequestResource
    {
        $manualRequest = ManualTimeRequests::create([
            'emp_id' => Auth::user()->emp_id,
            'request_type' => $request->request_type,
            'time' => $request->time,
            'reason' => $request->reason,
            'approval_status' => 'pending',
        ]);

        return new ManualTimeRequestResource($manualRequest);
    }


    public function approve(ManualTimeRequests $manualTimeRequest, Employee $reviewer)
    {
        $manualTimeRequest->update([
            'approval_status' => 'approved',
            'reviewed_by' =>  $reviewer->first_name . ' ' . $reviewer->last_name,
            'reviewed_at' => now(),
        ]);

        return $manualTimeRequest->refresh();
    }


    public function reject(ManualTimeRequests $manualTimeRequest, Employee $reviewer)
    {
        $manualTimeRequest->update([
            'approval_status' => 'rejected',
            'reviewed_by' =>  $reviewer->first_name . ' ' . $reviewer->last_name,
            'reviewed_at' => now(),
        ]);

        return $manualTimeRequest->refresh();
    }
}
