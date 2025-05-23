<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TimelogsController;
use App\Http\Controllers\AuditLogsController;
use App\Http\Controllers\SchedulesController;
use App\Http\Controllers\TimesheetsController;
use App\Http\Controllers\AssignedSchedulesController;
use App\Http\Controllers\ManualTimeRequestsController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\NotificationsController;

# Authentication
Route::controller(AuthController::class)
    ->prefix('auth')
    ->group(function () {
        Route::post('/login', 'login');
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/logout', 'logout');
            Route::get('/me', 'me');
        });
    });

# Schedules
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('schedules', SchedulesController::class);

});

#User Management
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
    Route::patch('/users/{user}/activate', [UserController::class, 'setActive']);
    Route::patch('/users/{user}/deactivate', [UserController::class, 'setInactive']);
});

# Manual Time Requests
Route::middleware('auth:sanctum')->group(function () {
    Route::post('manual-requests', [ManualTimeRequestsController::class, 'store']);
    Route::put('manual-requests/{manualTimeRequest}/approve', [ManualTimeRequestsController::class, 'approve']);
    Route::put('manual-requests/{manualTimeRequest}/reject', [ManualTimeRequestsController::class, 'reject']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('manual-requests', ManualTimeRequestsController::class);
});

# Assigned Schedules
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('assigned-schedules', AssignedSchedulesController::class);
    Route::delete('/assigned-schedules/{assigned_schedule}', [AssignedSchedulesController::class, 'destroy']);
});

# Audit Logs
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('audit-logs', AuditLogsController::class);
});

# Time Logs
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('timelogs/clock-in', [TimelogsController::class, 'clockIn']);
    Route::post('timelogs/clock-out', [TimelogsController::class, 'clockOut']);
    Route::get('employee/current-status', [TimelogsController::class, 'getCurrentStatus']);
});

Route::middleware(['auth:sanctum', 'role.permission:admin'])->group(function () {
    Route::apiResource('timelogs', TimelogsController::class)->except(['create']);
});

# Time Sheets
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('timesheets', TimesheetsController::class);
});

# Employee Schedules
Route::middleware('auth:sanctum')->group(function () {
    Route::get('employee/schedules', [AssignedSchedulesController::class, 'getEmployeeSchedules']);
});

# Employees
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('employees', EmployeeController::class);
});

# Notifications
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('notifications', NotificationsController::class);
});
