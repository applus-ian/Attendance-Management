<?php

namespace App\Services;

use App\Models\AuditLogs;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class AuditLogsService
{
    public function log(
        string $action,
        string $type,
        ?int $targetId,
        string $description,
        ?int $userId = null,
        ?string $role = null
    ): void {
        AuditLogs::create([
            'user_id'     => $userId ?? Auth::user()->user_id,
            'role'        => $role ??  Auth::user()?->roles->first()?->name ?? 'employee',
            'action_type' => $action,
            'target_type' => $type,
            'target_id'   => $targetId,
            'description' => $description,
            'ip_address'  => Request::ip(),
        ]);
    }
}
