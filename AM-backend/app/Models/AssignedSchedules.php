<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AssignedSchedules extends Model
{
    use HasFactory;
    protected $primaryKey = 'assigned_id';

    protected $fillable = [
        'emp_id',
        'sched_id',
        'assigned_at',
    ];

    public function schedule()
    {
        return $this->belongsTo(Schedules::class, 'sched_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'emp_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
