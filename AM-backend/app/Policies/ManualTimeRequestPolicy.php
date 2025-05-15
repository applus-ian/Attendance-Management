<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ManualTimeRequests;

class ManualTimeRequestPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->user_permissions()->contains('name', 'view_all_request');
    }

    public function view(User $user, ManualTimeRequests $timerequest): bool
    {
        return $user->user_permissions->contains('name', 'view_request');
    }

    public function create(User $user): bool
    {
        return $user->user_permissions()->contains('name', 'create_request');
    }

    public function approve(User $user, ManualTimeRequests $timerequest): bool
    {
        return $user->user_permissions->contains('name', 'approve_request');
    }

    public function reject(User $user, ManualTimeRequests $timerequest): bool
    {
        return $user->user_permissions->contains('name', 'reject_request');
    }
}
