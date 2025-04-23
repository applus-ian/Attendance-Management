<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedules extends Model
{
    protected $primaryKey = 'sched_id';

    protected $fillable = [
        'sched_start',
        'sched_end',
        'sched_break',
        'day',
        'num_assigned',
    ];

    public function assignedEmployees()
    {
        return $this->hasMany(AssignedSchedules::class, 'sched_id');
    }
}
