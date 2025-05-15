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
            'email' => $this->email,
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),

            'employee' => new EmployeeResource($this->whenLoaded('employee')),
        ];
    }
}
