<?php

namespace App\Models;

use Illuminate\Container\Attributes\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

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
        $notifiable = $this->notifiable;

        if(!$notifiable)
        {
            return "A " . $this->project_type . " was {$this->type}";
        }

        $type = strtolower(class_basename($notifiable));
        $label = method_exists($notifiable, 'getNotificationLabel')
            ? $notifiable->getNotificationLabel()
            : ($notifiable->name ?? $notifiable->title ?? 'Unknown');

        return ucfirst($type) ." '{$label}' was {$this->type}.";
    }

    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function notifiable(): MorphTo
    {
        return $this->morphTo();
    }
}
