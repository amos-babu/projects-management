<?php

namespace App\Http\Controllers;

use App\Enums\ProjectsStatus;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function getStatusCount()
    {
        $allStatuses = collect(ProjectsStatus::cases())
            ->mapWithKeys(fn($status)=>[$status->label()=> 0]);
        $allStatus = Project::query()
            ->pluck('status')
            ->map(fn($status)
                => $status->label()
            )
            ->countBy()
            ->union($allStatuses)->toArray();

            return Inertia::render('Dashboard', [
                'statusCount' => $allStatus
            ]);
    }
}
