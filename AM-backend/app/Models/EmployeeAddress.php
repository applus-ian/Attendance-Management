<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmployeeAddress extends Model
{
    protected $primaryKey = 'address_id';

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'address_id');
    }
}
