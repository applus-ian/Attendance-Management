<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ManualTimeRequests extends Model
{
    protected $primaryKey = 'request_id';

    protected $fillable = [
        'emp_id',
        'request_type',
        'request_time',
        'request_end',
        'reason',
        'approval_status',
        'reviewed_by',
        'reviewed_at',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'emp_id');
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
