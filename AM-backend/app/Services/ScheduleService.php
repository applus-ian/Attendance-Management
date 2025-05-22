<?php

namespace App\Services;

use App\Models\Schedules;

class ScheduleService
{
    public function store($data): Schedules
    {
        $days = $data['day'] === 'everyday'
            ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            : (array) $data['day'];

        $schedule = Schedules::create([
            'title' => $data['title'],
            'start' => $data['start'],
            'end' => $data['end'],
            'day' => $days,
            'num_assigned' => 0,
        ]);

        return $schedule;
    }

    public function update(Schedules $schedule, array $data): Schedules
    {
        $days = $data['day'] === 'everyday'
            ? ['monday', 'muesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            : (array) $data['day'];

        $schedule->update([
            'title' => $data['title'],
            'start' => $data['start'],
            'end' => $data['end'],
            'break' => $data['break'] ?? 0,
            'day' => $days,
        ]);

        return $schedule;
    }
}
