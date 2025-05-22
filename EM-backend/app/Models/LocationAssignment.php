<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LocationAssignment extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use SoftDeletes, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'job_position_id',
        'employee_id',
        'country_assign_id',
        'office_assign_id',
        'team_assign_id',
        'department_assign_id',
    ];

    public function jobPosition(): BelongsTo
    {
        return $this->belongsTo(JobPosition::class);
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function countryAssign(): BelongsTo
    {
        return $this->belongsTo(CountryAssign::class);
    }

    public function officeAssign(): BelongsTo
    {
        return $this->belongsTo(OfficeAssign::class);
    }

    public function teamAssign(): BelongsTo
    {
        return $this->belongsTo(TeamAssign::class);
    }

    public function departmentAssign(): BelongsTo
    {
        return $this->belongsTo(DepartmentAssign::class);
    }
}
