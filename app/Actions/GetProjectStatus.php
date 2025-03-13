<?php

namespace App\Actions;

use App\Enums\ProjectsStatus;
use App\Models\Project;

class GetProjectStatus
{
    public static function handle()
    {
        $allStatuses = collect(ProjectsStatus::cases())
                    ->mapWithKeys(fn($status)=>[$status->label()=> 0]);
        $allStatus = Project::query()
            ->pluck('status')
            ->map(fn($status)
                => $status->label()
            )
            ->countBy()
            ->union($allStatuses);

        return $allStatus;
    }
}
