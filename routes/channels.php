<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('projects.{userId}', function (User $user, $userId) {
    return (int) $user->id === (int) $userId;
});


Broadcast::channel('project_delete.{userId}', function (User $user, $userId) {
    return (int) $user->id === (int) $userId;
});

Broadcast::channel('task.{userId}', function (User $user, $userId) {
    return (int) $user->id === (int) $userId;
});
