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
            'id' => $this->assigned_id,
            'emp_id' => $this->emp_id,
            'employee' => $this->employee ? [
                'id' => $this->employee->emp_id,
                'name' => $this->employee->first_name . ' ' . $this->employee->last_name,
            ] : null,
            'schedule' => $this->schedule ? new ScheduleResource($this->schedule) : null,
            'assigned_at' => $this->assigned_at,
            'created_by' => $this->createdBy ? [
                'id' => $this->createdBy->user_id,
                'email' => $this->createdBy->email,
            ] : null,
            'updated_by' => $this->updatedBy ? [
                'id' => $this->updatedBy->user_id,
                'email' => $this->updatedBy->email,
            ] : null,
        ];
    }
}
