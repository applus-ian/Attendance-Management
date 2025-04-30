<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\TimelogsController;
use App\Http\Controllers\AuditLogsController;
use App\Http\Controllers\SchedulesController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\TimesheetsController;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\JobPositionController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\EmployeeAddressController;
use App\Http\Controllers\AssignedSchedulesController;
use App\Http\Controllers\ManualTimeRequestsController;

// Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);

    // User Management
    Route::apiResource('users', UserController::class);
    Route::apiResource('roles', RoleController::class);
    Route::apiResource('permissions', PermissionController::class);
    Route::post('roles/{role}/permissions', [RoleController::class, 'assignPermissions']);
    Route::post('users/{user}/roles', [UserController::class, 'assignRoles']);

    // Employees
    Route::apiResource('employees', EmployeeController::class);
    Route::apiResource('addresses', EmployeeAddressController::class);
    Route::apiResource('departments', DepartmentsController::class);
    Route::apiResource('job-positions', JobPositionController::class);

    // Schedules
    Route::apiResource('schedules', SchedulesController::class);
    Route::apiResource('assigned-schedules', AssignedSchedulesController::class);

    // Attendance & Timelogs
    Route::apiResource('timelogs', TimelogsController::class);
    Route::apiResource('timesheets', TimesheetsController::class);
    Route::get('timesheets/employee/{id}', [TimesheetsController::class, 'byEmployee']);

    // Manual Requests
    Route::apiResource('manual-requests', ManualTimeRequestsController::class);
    Route::post('manual-requests/{id}/approve', [ManualTimeRequestsController::class, 'approve']);
    Route::post('manual-requests/{id}/reject', [ManualTimeRequestsController::class, 'reject']);

    // Notifications
    Route::apiResource('notifications', NotificationsController::class);
    Route::post('notifications/{id}/mark-as-read', [NotificationsController::class, 'markAsRead']);

    Route::get('audit-logs', [AuditLogsController::class, 'index']);
});
