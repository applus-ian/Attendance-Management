<?php

namespace App\Services;

use App\Models\EmploymentStatusHistory;

class EmploymentStatusHistoryService
{
    // Create Employee Status History
    public function createEmploymentStatusHistory(int $employee_id, string $status_set, string $effective_date)
    {
        return EmploymentStatusHistory::create([
            'employee_id' => $employee_id,
            'status_set' => $status_set,
            'effective_date'=> $effective_date,

        ]);
    }
}
