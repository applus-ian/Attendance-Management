<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ManualTimeRequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'emp_id' => $this->emp_id,
            'request_type' => $this->request_type,
            'time' => $this->time,
            'reason' => $this->reason,
            'approval_status' => $this->approval_status,
            'reviewed_by' => $this->reviewed_by,
            'reviewed_at' => $this->reviewed_at,
        ];
    }
}
