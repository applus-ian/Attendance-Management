<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuditLogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'log_id'       => $this->log_id,
            'user_id'      => $this->user_id,
            'id'      => $this->id,
            'role'         => $this->role,
            'action_type'  => $this->action_type,
            'target_type'  => $this->target_type,
            'target_id'    => $this->target_id,
            'description'  => $this->description,
            'ip_address'   => $this->ip_address,
            'created_at'   => $this->created_at,
        ];
    }
}
