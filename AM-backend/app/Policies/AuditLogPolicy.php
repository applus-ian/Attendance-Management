<?php

namespace App\Policies;

use App\Models\User;
use App\Models\AuditLogs;

class AuditLogPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view auditlogs');
    }

    public function view(User $user, AuditLogs $log): bool
    {
        return $user->can('view auditlog');
    }

    public function create(User $user): bool
    {
        return $user->can('create auditlogs');
    }
}
