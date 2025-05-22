<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use App\Enums\Gender;
use App\Enums\CivilStatus;
use Carbon\Carbon;

class Employee extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use SoftDeletes, HasFactory, Notifiable;

    protected $casts = [
        'gender' => Gender::class,
        'civil_status' => CivilStatus::class,
    ];

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
        'email',
        'job_position_id',
        'date_hired',
        'employment_type_id',
        'manager_id',
        'profile_pic_url',
        'tin_number',
        'sss_number',
        'pagibig_number',
        'philhealth_number',
        'bank_number',
    ];

    public function jobPosition(): BelongsTo
    {
        return $this->belongsTo(JobPosition::class);
    }

    public function locationAssignment(): HasOne
    {
        return $this->hasOne(LocationAssignment::class);
    }

    public function employmentType(): BelongsTo
    {
        return $this->belongsTo(EmploymentType::class);
    }

    public function Manager(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'manager_id');
    }

    public function getAgeAttribute(): int
    {
        return Carbon::parse($this->birthdate)->age;
    }

    public function getIsBirthdayAttribute(): bool
    {
        return Carbon::parse($this->birthdate)->isBirthday();
    }
}
