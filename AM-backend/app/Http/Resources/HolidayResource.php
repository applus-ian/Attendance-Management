<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HolidayResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'holiday_id' => $this->holiday_id,
            'name'       => $this->name,
            'date'       => Carbon::parse($this->date)->toDateString(),
            'type'       => $this->type,
            'movable'    => $this->movable,
            'active'     => $this->active,
            'is_auto'    => $this->is_auto,
            'created_by' => $this->created_by,
        ];
    }
}
