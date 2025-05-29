<?php

namespace App\Services;

use App\Models\Holiday;
use Illuminate\Support\Facades\Http;
use App\Services\AuditLogsService;

class HolidayService
{
    public function __construct(protected AuditLogsService $auditLogsService)
    {
        $this->auditLogsService = $auditLogsService;
    }

    public function createManual(array $data): Holiday
    {
        $holiday = Holiday::create([
            'name'      => $data['name'],
            'date'      => $data['date'],
            'type'      => $data['type'],
            'movable'   => $data['movable'] ?? false,
            'active'    => $data['active'] ?? true,
            'is_auto'   => false,
        ]);

        $this->auditLogsService->log(
            action: 'Create Holiday',
            type: 'Holiday',
            targetId: $holiday->holiday_id,
            description: "Created manual holiday: {$holiday->name}"
        );

        return $holiday;
    }

    public function updateManual(Holiday $holiday, array $data): Holiday
    {
        $holiday->update([
            'name'    => $data['name'],
            'date'    => $data['date'],
            'type'    => $data['type'],
            'movable' => $data['movable'] ?? false,
            'active'  => $data['active'] ?? true,
        ]);

        $this->auditLogsService->log(
            action: 'Update Holiday',
            type: 'Holiday',
            targetId: $holiday->holiday_id,
            description: "Updated holiday to: {$holiday->name}"
        );

        return $holiday;
    }

    public function deleteManual(Holiday $holiday): void
    {
        $holiday->delete();

        $this->auditLogsService->log(
            action: 'Delete Holiday',
            type: 'Holiday',
            targetId: $holiday->holiday_id,
            description: "Deleted holiday"
        );
    }

    public function syncAuto(int $year): void
    {
        $response = Http::get("https://date.nager.at/api/v3/PublicHolidays/{$year}/PH");
        foreach ($response->json() as $item) {
            $h = Holiday::updateOrCreate(
                ['date' => $item['date'], 'is_auto' => true],
                [
                    'name'    => $item['localName'],
                    'type'    => 'Regular Holiday',
                    'movable' => false,
                    'active'  => true,
                ]
            );

            $this->auditLogsService->log(
                action: 'Sync Holiday',
                type: 'Holiday',
                targetId: $h->holiday_id,
                description: "Auto-synced holiday: {$h->user_id}"
            );
        }
    }
}
