<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLogs extends Model
{
    protected $primaryKey = 'log_id';

    protected $fillable = [
        'user_id',
        'role',
        'action_type',
        'target_type',
        'target_id',
        'description',
        'ip_address',
        'device',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
