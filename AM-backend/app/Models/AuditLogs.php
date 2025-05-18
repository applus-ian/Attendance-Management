<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;

class AuditLogs extends Model
{
    use HasFactory, HasRoles;
    protected $primaryKey = 'log_id';

    protected $fillable = [
        'user_id',
        'role',
        'action_type',
        'target_type',
        'target_id',
        'description',
        'ip_address',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'id');
    }
}
