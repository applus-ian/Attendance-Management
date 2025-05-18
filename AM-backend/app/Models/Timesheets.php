<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Timesheets extends Model
{
    use HasFactory;
    protected $primaryKey = 'timesheet_id';

    protected $fillable = [
        'emp_id',
        'total_hrs_work',
        'total_overtime_hrs',
        'total_present',
        'total_absent',
        'total_lates',
        'scheduled_hrs'
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'emp_id');
    }
}
