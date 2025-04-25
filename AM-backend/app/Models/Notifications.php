<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    protected $primaryKey = 'notif_id';

    public $timestamps = false;

    protected $fillable = [
        'emp_id',
        'notif_type',
        'notif_status',
        'created_at',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'emp_id');
    }
}
