<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    protected $fillable = [
        'user_id',
        'project_id',
        'type',
        'is_read'
    ];

    public function getMessageAttribute()
    {
        if(!$this->project)
        {
            return "A project was {$this->type}";
        }
        return "Project '{$this->project->name}' was {$this->type}.";
    }

    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
