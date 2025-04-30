<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobPosition extends Model
{
    protected $primaryKey = 'job_position_id';

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class, 'job_position_id');
    }
}
