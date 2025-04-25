<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timelogs extends Model
{
    protected $primaryKey = 'log_id';

    public $timestamps = false;

    protected $fillable = ['emp_id', 'log_type', 'log_time', 'created_by', 'is_absent'];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'emp_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
