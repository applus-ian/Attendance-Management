<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Timelogs;
use App\Models\AuditLogs;
use App\Models\Timesheets;
use App\Policies\UserPolicy;
use App\Policies\TimelogPolicy;
use App\Policies\AuditLogPolicy;
use App\Models\AssignedSchedules;
use App\Policies\TimesheetPolicy;
use App\Models\ManualTimeRequests;
use App\Policies\AssignedSchedulePolicy;
use App\Policies\ManualTimeRequestPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{

    protected $policies = [
        User::class => UserPolicy::class,
        AuditLogs::class => AuditLogPolicy::class,
        Timelogs::class => TimelogPolicy::class,
        Timesheets::class => TimesheetPolicy::class,
        AssignedSchedules::class => AssignedSchedulePolicy::class,
        ManualTimeRequests::class => ManualTimeRequestPolicy::class,
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
