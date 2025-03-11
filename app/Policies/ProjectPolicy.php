<?php

namespace App\Policies;

use App\Enums\UserRoles;
use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    public function viewAny(User $user): bool
    {
        return false;
    }

    public function view(User $user, Project $project): bool
    {
        return false;
    }

    public function create(User $user, ?Project $project = null): bool
    {
        return $user->role->value === UserRoles::ADMIN->value;
    }

    public function update(User $user, ?Project $project = null): bool
    {
        return in_array($user->role->value, [UserRoles::ADMIN->value, UserRoles::MANAGER->value]);
    }

    public function delete(User $user, Project $project): bool
    {
        return $user->role->value === UserRoles::ADMIN->value;
    }
}
