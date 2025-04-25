<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'emp_id');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
