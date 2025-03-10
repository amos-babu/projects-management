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
        return  $user->hasRole(UserRoles::ADMIN)||
                $user->hasRole(UserRoles::MANAGER)||
                $user->hasRole(UserRoles::MEMBER);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Project $project): bool
    {
        if($user->hasRole(UserRoles::ADMIN)){
            return true;
        }

        if($user->hasRole(UserRoles::MANAGER) && $project->manager_assigned_id === $user->id){
            return true;
        }

        if($user->hasRole(UserRoles::MEMBER) && $project->tasks()->where('developer_assigned_to', $user->id)->exists()){
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Project $project): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Project $project): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Project $project): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Project $project): bool
    {
        return false;
    }
}
