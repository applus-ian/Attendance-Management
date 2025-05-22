<?php

namespace App\Http\Resources;

use Hashids\Hashids;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $hashids = new Hashids('', 7);

        return [
            'id' => $hashids->encode($this->id),
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'last_name' => $this->last_name,
            'suffix' => $this->suffix,
            'gender' => $this->gender,
            'birthdate' => $this->birthdate,
            'age' => $this->age,
            'is_birthday' => $this->is_birthday, // Laravel automatically converts accessor method names to snake_case
            'civil_status' => $this->civil_status,
            'nationality' => $this->nationality,
            'region' => $this->region,
            'province' => $this->province,
            'city_or_municipality' => $this->city_or_municipality,
            'barangay' => $this->barangay,
            'street' => $this->street,
            'phone_number' => $this->phone_number,
            'emergency_contact1' => $this->emergency_contact1,
            'emergency_contact2' => $this->emergency_contact2,
            'email' => $this->email,
            'job_position' => new JobPositionResource($this->whenLoaded('jobPosition')),
            'location_assignment' => new LocationAssignmentResource($this->whenLoaded('locationAssignment')),
            'date_hired' => $this->date_hired,
            'employment_type' => new EmploymentTypeResource($this->whenLoaded('employmentType')),
            'manager' => $this->manager_id,
            'profile_pic_url' => new ManagerResource($this->whenLoaded('manager')),
            'tin_number' => $this->tin_number,
            'sss_number' => $this->sss_number,
            'pagibig_number' => $this->pagibig_number,
            'philhealth_number' => $this->philhealth_number,
            'bank_number' => $this->bank_number,
        ];
    }
}
