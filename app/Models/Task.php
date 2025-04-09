<?php

namespace App\Models;

use App\Enums\TaskStatus;
use App\Observers\TaskObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'project_id',
        'status',
        'start_date',
        'end_date',
        'developer_assigned_id'
    ];

    public $casts = [
        'status' => TaskStatus::class
    ];

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function developedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'developer_assigned_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }
}
