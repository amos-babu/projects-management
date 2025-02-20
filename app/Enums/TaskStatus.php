<?php

namespace App\Enums;

enum TaskStatus: string
{
    case TODO = 'to_do';
    case IN_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';

    public function label(): string {
        return match($this){
            TaskStatus::TODO => 'To do',
            TaskStatus::IN_PROGRESS => 'In Progress',
            TaskStatus::COMPLETED => 'Completed'
        };
    }

}
