<?php

namespace App\Actions;

use App\Enums\UserRoles;

class DisplayProjectsAction
{
    public static function handle($query, $user)
    {
        if($user->role->value === UserRoles::ADMIN->value){
            $projects = $query
                    ->latest()
                    ->paginate();
        } elseif ($user->role->value === UserRoles::MANAGER->value) {
            $projects = $query
                    ->where('manager_assigned_id', $user->id)
                    ->latest()
                    ->paginate();
        } else {
            $projects = $query
                    ->whereHas('tasks', function($q) use ($user){
                        $q->where('developer_assigned_id', $user->id);
                    })
                    ->latest()
                    ->paginate();
        }

        return $projects;
    }
}
