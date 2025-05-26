<?php

namespace App\Services;

use App\Models\Schedules;

class ScheduleService
{
    protected function normalizeDays(array|string $days): array
    {
        if (is_string($days) && strtolower($days) === 'everyday') {
            return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        }

        if (is_string($days)) {
            // Convert comma-separated string to array
            $days = explode(',', $days);
        }

        // Normalize all days to lowercase trimmed strings
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

            \Log::info('Schedule created successfully', ['sched_id' => $schedule->sched_id]);

            return $schedule;

        } catch (\Exception $e) {
            \Log::error('Schedule creation failed: ' . $e->getMessage(), ['data' => $data]);
            throw $e;
        }
    }

    public function update(Schedules $schedule, array $data): Schedules
    {
        try {
            \Log::info('Updating schedule ID: ' . $schedule->sched_id, ['data' => $data]);

            $days = isset($data['day']) ? $this->normalizeDays($data['day']) : $schedule->day;

            $schedule->update([
                'title' => $data['title'] ?? $schedule->title,
                'start' => $data['start'] ?? $schedule->start,
                'end' => $data['end'] ?? $schedule->end,
                'day' => $days,
            ]);

            \Log::info('Update success for schedule ID: ' . $schedule->sched_id);

            $schedule->refresh();

            return $schedule;

        } catch (\Exception $e) {
            \Log::error('Schedule update failed: ' . $e->getMessage());
            throw $e;
        }
    }
}
