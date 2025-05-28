<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TimesheetResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'timesheet_id'      => $this->timesheet_id,
            'emp_id'            => $this->emp_id,
            'date'         => $this->timesheet_date,
            'total_hrs_work'    => (float)$this->total_hrs_work,
            'total_overtime_hrs' => (float)$this->total_overtime_hrs,
            'total_present'     => (int)$this->total_present,
            'total_absent'      => (int)$this->total_absent,
            'total_lates'       => (int)$this->total_lates,
            'scheduled_hrs'     => (float)$this->scheduled_hrs,
            'timelogs'          => TimelogResource::collection($this->whenLoaded('timelogs')),
        ];
    }
}
