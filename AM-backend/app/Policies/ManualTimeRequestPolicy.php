<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ManualTimeRequests;

class ManualTimeRequestPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view requests');
    }

    public function view(User $user, ManualTimeRequests $timerequest): bool
    {
        return $user->can('view request');
    }

    public function create(User $user): bool
    {
        return $user->can('create requests');
    }

    public function approve(User $user, ManualTimeRequests $timerequest): bool
    {
        return $user->can('approve requests');
    }

    public function reject(User $user, ManualTimeRequests $timerequest): bool
    {
        return $user->can('reject requests');
    }
}
