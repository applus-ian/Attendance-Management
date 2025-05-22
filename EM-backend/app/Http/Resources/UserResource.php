<?php

namespace App\Http\Resources;

use Hashids\Hashids;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email' => $this->email,
            'employee' => new EmployeeResource($this->whenLoaded('employee')), // Include employee data
            'roles' => RoleResource::collection($this->whenLoaded('roles')),
        ];
    }
}
