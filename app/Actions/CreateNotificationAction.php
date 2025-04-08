<?php

namespace App\Actions;

use App\Models\Notification;

class CreateNotificationAction
{
    public static function handle($managerId, $projectId, $actionType, $projectType)
    {
        return Notification::create([
            'user_id' => $managerId,
            'project_id' => $projectId,
            'type' => $actionType,
            'is_read' => false,
            'project_type' => $projectType
        ]);
    }
}
