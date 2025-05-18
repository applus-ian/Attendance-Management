<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Schedules extends Model
{
    use HasFactory;
    protected $primaryKey = 'sched_id';

    protected $fillable = [
        'title',
        'start',
        'end',
        'day',
    ];

    protected $casts = [
        'day' => 'array',
    ];

    public function assignedEmployees()
    {
        return $this->hasMany(AssignedSchedules::class, 'sched_id');
    }

    public function isActiveOn($weekday): bool
    {
        return in_array($weekday, $this->day);
    }
}
