<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Timelogs extends Model
{
    use HasFactory;

    protected $primaryKey = 'timelog_id';

    protected $fillable = [
        'emp_id',
        'timelog_type',
        'time',
        'created_by',
        'is_absent',
        'is_present',
        'is_late',
        'hrs_worked',
        'overtime_hrs',
        'comment',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'emp_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
