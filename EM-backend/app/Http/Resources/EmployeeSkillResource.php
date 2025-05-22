<?php

namespace App\Http\Resources;

use Hashids\Hashids;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeSkillResource extends JsonResource
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
            'employee_id' => $hashids->encode($this->employee_id),
            'skill' => new SkillResource($this->whenLoaded('skill')),
            'years_of_experience' => $this->years_of_experience,
        ];
    }
}
