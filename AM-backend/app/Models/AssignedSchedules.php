<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssignedSchedules extends Model
{
    protected $primaryKey = 'assigned_id';

    public $timestamps = false;

    protected $fillable = ['emp_id', 'sched_id', 'assigned_at'];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'emp_id');
    }

    public function schedule()
    {
        return $this->belongsTo(Schedules::class, 'sched_id');
    }
}
