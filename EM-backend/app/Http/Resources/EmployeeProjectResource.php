<?php

namespace App\Http\Resources;

use Hashids\Hashids;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeProjectResource extends JsonResource
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
            'profile' => $this->employee->profile_pic_url ?? null,
            'full_name' => $this->employee->first_name. ' ' .$this->employee->last_name,
            'job_position' => $this->employee->jobPosition->title,
            'department' => $this->employee->locationAssignment->departmentAssign->name,
            'project_role_id' => $this->project_role_id,
        ];
    }
}
