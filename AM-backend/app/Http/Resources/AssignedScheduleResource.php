<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssignedScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'assigned_id' => $this->assigned_id,
            'emp_id' => $this->emp_id,
            'assigned_at' => $this->assigned_at,
            'schedule' => new ScheduleResource($this->schedule),

            'created_by' => $this->createdBy ? [
                'user_id' => $this->createdBy->user_id,
                'email' => $this->createdBy->email,
            ] : null,

            'updated_by' => $this->updatedBy ? [
                'user_id' => $this->updatedBy->user_id,
                'email' => $this->updatedBy->email,
            ] : null,
        ];
    }
}
