<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmployeeAddress extends Model
{
    use HasFactory;
    protected $primaryKey = 'address_id';

    protected $fillable = [
        'employee_id',
        'province',
        'city_or_municipality',
        'barangay',
        'street',
        'postal_code'
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
