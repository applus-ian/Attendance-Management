<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{

    use Notifiable, HasFactory;

    protected $primaryKey = 'emp_id';

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'email',
        'gender',
        'dob',
        'civil_status',
        'nationality',
        'phone_number',
        'emergency_contact1',
        'emergency_contact2',
        'date_hired',
        'status',
        'profile_pic_url'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'emp_id');
    }

    public function department()
    {
        return $this->belongsTo(Departments::class, 'dept_id');
    }

    public function assignedSchedules()
    {
        return $this->hasMany(AssignedSchedules::class, 'emp_id');
    }

    public function timelogs()
    {
        return $this->hasMany(Timelogs::class, 'emp_id');
    }

    public function timesheets()
    {
        return $this->hasMany(Timesheets::class, 'emp_id');
    }

    public function manualTimeRequests()
    {
        return $this->hasMany(ManualTimeRequests::class, 'emp_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notifications::class, 'emp_id');
    }

    public function jobPosition()
    {
        return $this->belongsTo(JobPosition::class, 'job_position_id', 'job_position_id');
    }

    public function address()
    {
        return $this->belongsTo(EmployeeAddress::class, 'address_id', 'address_id');
    }
}
