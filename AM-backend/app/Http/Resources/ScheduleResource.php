<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'sched_id' => $this->sched_id,
            'title' => $this->title,
            'start' => $this->start,
            'end' => $this->end,
            'day' => $this->day,
            'num_assigned' => $this->num_assigned,
            'created_at' => $this->created_at,
        ];
    }
}
