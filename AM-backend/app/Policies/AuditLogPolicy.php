<?php

namespace App\Policies;

use App\Models\User;
use App\Models\AuditLogs;

class AuditLogPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->permissions->contains('name', 'view_any_auditlog');
    }

    public function view(User $user, AuditLogs $log): bool
    {
        return $user->permissions->contains('name', 'view_auditlog');
    }

    public function create(User $user): bool
    {
        return $user->permissions->contains('name', 'create_auditlog');
    }

    public function update(User $user, AuditLogs $log): bool
    {
        return $user->permissions->contains('name', 'update_auditlog');
    }

    public function delete(User $user, AuditLogs $log): bool
    {
        return $user->permissions->contains('name', 'delete_auditlog');
    }
}
