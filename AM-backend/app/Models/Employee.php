<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $primaryKey = 'emp_id';

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'gender',
        'civil_status',
        'email',
        'phone_number',
        'dob',
        'dept_id',
        'position',
        'status',
        'date_hired',
        'address_line1',
        'address_line2',
        'city',
        'state',
        'country',
        'postal_code',
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
