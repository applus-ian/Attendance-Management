<?php

namespace App\Services;

use App\Models\User;
use App\Models\Employee;
use App\Models\AuditLogs;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class AuditLogsService
{
    protected array $allowedRoles = ['employee', 'admin', 'super_admin'];

    public function log(
        string $action,
        string $type,
        ?int $targetId,
        string $description,
        ?int $userId = null,
        ?string $role = null
    ): void {
        /** @var User $user */
        $user = Auth::user();

        $employee = Employee::where('emp_id', $user?->emp_id)->first();

        // Get role from parameter or fallback to user's first assigned role
        $resolvedRole = $role ?? $user?->getRoleNames()?->first() ?? 'employee';

        // Ensure the resolved role is valid for the enum
        if (!in_array($resolvedRole, $this->allowedRoles)) {
            $resolvedRole = 'employee';
        }

        AuditLogs::create([
            'user_id'     => $userId ?? $user?->user_id,
            'first_name'  => $employee->first_name,
            'last_name'   => $employee->last_name,
            'role'        => $resolvedRole,
            'action_type' => $action,
            'target_type' => $type,
            'target_id'   => $targetId,
            'description' => $description,
            'ip_address'  => Request::ip(),
        ]);
    }
}
