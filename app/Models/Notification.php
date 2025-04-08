<?php

namespace App\Models;

use Illuminate\Container\Attributes\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    protected $fillable = [
        'user_id',
        'project_id',
        'type',
        'is_read',
        'project_type'
    ];

    public function getMessageAttribute()
    {
        if(!$this->project)
        {
            return "A ".$this->project_type. "was {$this->type}";
        }
        return ucfirst($this->project_type) ." '{$this->project->name}' was {$this->type}.";
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
