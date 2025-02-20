<?php

namespace App\Enums;

enum ProjectsStatus: string
{
    case PENDING = 'pending';
    case IN_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';

    public function label(): string {
        return match($this){
            ProjectsStatus::PENDING => 'Pending',
            ProjectsStatus::IN_PROGRESS => 'In Progress',
            ProjectsStatus::COMPLETED => 'Completed'
        };
    }

}
