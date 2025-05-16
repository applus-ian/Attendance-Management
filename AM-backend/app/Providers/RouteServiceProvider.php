<?php

namespace App\Providers;

use App\Models\ManualTimeRequests;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
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
        Route::model('manual_request', ManualTimeRequests::class);
    }
}
