<?php

namespace App\Models;

use App\Models\AssignedSchedules;
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
        'department',
        'job_position',
        'address',
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

    /**
     * Relationship to the associated User.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'emp_id');
    }

    public function department()
    {
        return $this->belongsTo(Departments::class, 'department_id');
    }

    public function assignedSchedule()
    {
        return $this->hasOne(AssignedSchedules::class, 'emp_id', 'emp_id')->latestOfMany('assigned_at');
    }

    public function schedule()
    {
        return $this->hasMany(Schedules::class);
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
        return $this->belongsTo(JobPosition::class, 'job_position_id');
    }

    public function address()
    {
        return $this->hasOne(EmployeeAddress::class);
    }

    /**
     * Spatie Role Helpers (delegated to User model)
     */
    public function getRoleNamesAttribute()
    {
        return $this->user?->getRoleNames() ?? collect();
    }

    public function getAllPermissionsAttribute()
    {
        return $this->user?->getAllPermissions() ?? collect();
    }

    public function hasPermissionTo($permission)
    {
        return $this->user?->hasPermissionTo($permission) ?? false;
    }
}
