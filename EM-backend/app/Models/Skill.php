<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Skill extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use SoftDeletes, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'skill_category_id',
    ];

    public function skillCategory(): BelongsTo
    {
        return $this->belongsTo(SkillCategory::class);
    }
}
