<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Employee extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use SoftDeletes, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'gender',
        'birthdate',
        'civil_status',
        'nationality',
        'region',
        'province',
        'city_or_municipality',
        'barangay',
        'street',
        'phone_number',
        'emergency_contact1',
        'emergency_contact2',
        'email_address',
        'job_position_id',
        'date_hired',
        'employment_type',
        'manager_id',
        'profile_pic_url',
    ];
}
