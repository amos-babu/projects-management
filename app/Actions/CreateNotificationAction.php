<?php

namespace App\Actions;
use Illuminate\Database\Eloquent\Model;

class CreateNotificationAction
{
    public static function handle($managerId, Model $notifiable, $actionType, $projectType)
    {
        return $notifiable->notifications()->create([
            'user_id' => $managerId,
            'type' => $actionType,
            'is_read' => false,
            'project_type' => $projectType
        ]);
    }
}
