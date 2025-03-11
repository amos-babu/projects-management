<?php

namespace App\Policies;

use App\Enums\UserRoles;
use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TaskPolicy
{

    public function viewAny(User $user): bool
    {
        return false;
    }

    public function view(User $user, Task $task): bool
    {
        return false;
    }

    public function create(User $user): bool
    {
        return in_array($user->role->value, [UserRoles::ADMIN->value, UserRoles::MANAGER->value]);
    }

    public function update(User $user, Task $task): bool
    {
        return $user->role->value === UserRoles::MANAGER->value;
    }

    public function delete(User $user, Task $task): bool
    {
        return $user->role->value === UserRoles::MANAGER->value;
    }
}
