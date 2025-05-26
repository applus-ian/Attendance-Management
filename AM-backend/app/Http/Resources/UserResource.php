<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'user_id' => $this->user_id,
            'emp_id' => $this->emp_id,
            'name' => $this->name,
            'email' => $this->email,
            'is_active' => $this->is_active,
            'roles' => $this->getRoleNames(),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),

            'employee' => $this->whenLoaded('employee', function () {
                $assignedSchedule = $this->employee->assignedSchedule()
                    ->latest('assigned_at')
                    ->with('schedule')
                    ->first();

                return [
                    'emp_id' => $this->employee->emp_id,
                    'user_id' => $this->employee->user_id,
                    'department' => $this->employee->department,
                    'job_position' => $this->employee->job_position,
                    'address' => $this->employee->address,
                    'first_name' => $this->employee->first_name,
                    'middle_name' => $this->employee->middle_name,
                    'last_name' => $this->employee->last_name,
                    'suffix' => $this->employee->suffix,
                    'gender' => $this->employee->gender,
                    'dob' => $this->employee->dob,
                    'civil_status' => $this->employee->civil_status,
                    'nationality' => $this->employee->nationality,
                    'phone_number' => $this->employee->phone_number,
                    'emergency_contact1' => $this->employee->emergency_contact1,
                    'emergency_contact2' => $this->employee->emergency_contact2,
                    'date_hired' => $this->employee->date_hired,
                    'status' => $this->employee->status,
                    'profile_pic_url' => $this->employee->profile_pic_url,
                    'created_at' => $this->employee->created_at?->toDateTimeString(),
                    'updated_at' => $this->employee->updated_at?->toDateTimeString(),
                    'assigned_schedule' => $assignedSchedule ? new AssignedScheduleResource($assignedSchedule) : null,
                ];
            }),
        ];
    }
}
