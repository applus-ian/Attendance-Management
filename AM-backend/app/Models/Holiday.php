<?php

// app/Models/Holiday.php
namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class Holiday extends Model
{
    protected $primaryKey = 'holiday_id';

    protected $casts = [
        'date' => 'date',
    ];

    protected $fillable = [
        'name',
        'date',
        'type',
        'movable',
        'active',
        'is_auto',
        'created_by',
    ];

    protected static $logAttributes = ['name', 'date', 'type', 'movable', 'active'];
    protected static $logOnlyDirty = true;

    protected static function booted()
    {
        static::creating(function ($h) {
            if (Auth::check()) {
                $h->created_by = Auth::user()->user_id;
            }
        });
    }
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
