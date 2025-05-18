<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ManualTimeRequests extends Model
{
    use HasFactory;
    protected $primaryKey = 'request_id';

    protected $fillable = [
        'emp_id',
        'request_type',
        'time',
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
