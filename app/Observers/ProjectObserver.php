<?php

namespace App\Observers;

use App\Enums\ProjectsStatus;
use App\Enums\TaskStatus;
use App\Models\Project;

class ProjectObserver
{
    public function saved(Project $project)
    {
        $inProgressTasks = $project->tasks()
            ->whereIn('status', [TaskStatus::TODO, TaskStatus::IN_PROGRESS])
            ->count();
        if ($inProgressTasks > 0){
            $project->status = ProjectsStatus::IN_PROGRESS;
        } else {
            $project->status = ProjectsStatus::COMPLETED;
        }

        $project->saveQuietly();
    }
}
