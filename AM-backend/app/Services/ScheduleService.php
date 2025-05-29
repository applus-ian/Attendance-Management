<?php

namespace App\Services;

use Exception;
use App\Models\Schedules;

class ScheduleService
{
    protected function normalizeDays(array|string $days): array
    {
        if (is_string($days) && strtolower($days) === 'everyday') {
            return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        }

        if (is_string($days)) {

            $days = explode(',', $days);
        }


        return array_map(fn($d) => strtolower(trim($d)), $days);
    }

    public function store(array $data): Schedules
    {
        try {
            $days = $this->normalizeDays($data['day']);

            $schedule = Schedules::create([
                'title' => $data['title'],
                'start' => $data['start'],
                'end' => $data['end'],
                'day' => $days,
                'num_assigned' => 0,
            ]);


            return $schedule;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function update(Schedules $schedule, array $data): Schedules
    {
        try {

            $days = isset($data['day']) ? $this->normalizeDays($data['day']) : $schedule->day;

            $schedule->update([
                'title' => $data['title'] ?? $schedule->title,
                'start' => $data['start'] ?? $schedule->start,
                'end' => $data['end'] ?? $schedule->end,
                'day' => $days,
            ]);


            $schedule->refresh();

            return $schedule;
        } catch (Exception $e) {
            throw $e;
        }
    }
}
