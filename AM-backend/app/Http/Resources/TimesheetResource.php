<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TimesheetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'timesheet_id' => $this->timesheet_id,
            'emp_id' => $this->emp_id,
            'date' => $this->date,
            'total_hrs_work' => $this->total_hrs_work,
            'break_duration' => $this->break_duration,
            'overtime_hrs' => $this->overtime_hrs,
            'total_lates' => $this->total_lates,
            'approved_by' => $this->approved_by
        ];
    }
}
