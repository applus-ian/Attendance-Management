<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TimelogResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'timelog_id'   => $this->timelog_id,
            'type'         => $this->timelog_type,
            'time'         => $this->time,
            'is_present'   => (bool)$this->is_present,
            'is_absent'    => (bool)$this->is_absent,
            'is_late'      => (bool)$this->is_late,
            'hrs_worked'   => (float)$this->hrs_worked,
            'overtime_hrs' => (float)$this->overtime_hrs,
        ];
    }
}
