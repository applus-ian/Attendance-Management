<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory, HasRoles;

    protected $primaryKey = 'user_id';

    protected $fillable = [
        'email',
        'password',
        'emp_id',
        'is_active',
        'name',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Optional if you're using api guard for permissions
    // protected $guard_name = 'api';

    /**
     * Relationship with Employee
     */
    public function employee(): HasOne
    {
        return $this->hasOne(Employee::class, 'emp_id', 'emp_id');
    }

    /**
     * Relationship with Audit Logs
     */
    public function auditLogs(): HasMany
    {
        return $this->hasMany(AuditLogs::class, 'user_id');
    }

    /**
     * Shortcut: Get all permissions from assigned roles and direct permissions.
     */
    public function allPermissions()
    {
        return $this->getAllPermissions();
    }

    /**
     * Optional Shortcut: Check permission.
     */
    public function hasPermission(string $permission): bool
    {
        return $this->hasPermissionTo($permission);
    }
}
