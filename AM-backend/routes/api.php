<?php

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\SchedulesController;
use App\Http\Controllers\AssignedSchedulesController;
use App\Http\Controllers\TimelogsController;
use App\Http\Controllers\TimesheetsController;
use App\Http\Controllers\ManualTimeRequestsController;
use App\Http\Controllers\AuditLogsController;
use App\Http\Controllers\NotificationsController;

Route::prefix('v1')->group(function () {

    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {

        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::apiResource('users', UserController::class)->except(['create', 'edit']);
        Route::apiResource('employees', EmployeeController::class)->except(['create', 'edit']);
        Route::apiResource('departments', DepartmentsController::class)->except(['create', 'edit']);
        Route::apiResource('schedules', SchedulesController::class)->except(['create', 'edit']);
        Route::apiResource('assigned-schedules', AssignedSchedulesController::class)->except(['create', 'edit']);
        Route::apiResource('timelogs', TimelogsController::class)->except(['create', 'edit']);
        Route::apiResource('timesheets', TimesheetsController::class)->except(['create', 'edit']);
        Route::apiResource('manual-time-requests', ManualTimeRequestsController::class)->except(['create', 'edit']);
        Route::apiResource('audit-logs', AuditLogsController::class)->only(['index', 'show']);
        Route::apiResource('notifications', NotificationsController::class)->only(['index', 'update']);
    });
});
