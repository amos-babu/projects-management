<?php

namespace App\Http\Controllers;

use App\Actions\GetProjectStatus;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function getStatusCount()
    {
        return Inertia::render('Dashboard', [
            'statusCount' => GetProjectStatus::handle(),
        ]);
    }
}
