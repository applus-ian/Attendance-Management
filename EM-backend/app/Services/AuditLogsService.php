<?php

namespace App\Services;

use App\Models\AuditLog;

class AuditLogsService
{
    // Create Audit Log
    public function createAuditLog(array $data)
    {
        return AuditLog::create([
            'user_id' => $data['user_id'],
            'action' => $data['action'],
            'affected_table' => $data['affected_table'],
            'changes_made' => $data['changes_made'],
        ]);
    }

    // Read (Get a single audit log by ID)
    public function getAuditLogById(int $id): ?AuditLog
    {
        return AuditLog::findOrFail($id);
    }

    // Read (Get all audit logs - will refactor for filters in the future)
    public function getAllAuditLogs()
    {
        return AuditLog::all();
    }
}
