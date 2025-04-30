<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Timesheets extends Model
{
    protected $primaryKey = 'timesheet_id';

    protected $fillable = [
        'emp_id',
        'date',
        'total_work_hrs',
        'break_duration',
        'overtime_hrs',
        'total_lates',
        'approved_by',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'emp_id');
    }
}
