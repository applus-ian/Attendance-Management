<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'emp_id' => $this->emp_id,
            'user_id' => $this->user_id,
            'department' => $this->name,
            'job_position' => $this->title,
            'address' => $this->city_or_municipality,
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'last_name' => $this->last_name,
            'suffix' => $this->suffix,
            'gender' => $this->gender,
            'dob' => $this->dob,
            'civil_status' => $this->civil_status,
            'nationality' => $this->nationality,
            'phone_number' => $this->phone_number,
            'emergency_contact1' => $this->emergency_contact1,
            'emergency_contact2' => $this->emergency_contact2,
            'date_hired' => $this->date_hired,
            'status' => $this->status,
            'profile_pic_url' => $this->profile_pic_url,
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
