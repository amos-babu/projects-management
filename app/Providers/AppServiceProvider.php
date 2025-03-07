<?php

namespace App\Providers;

use App\Models\Project;
use App\Observers\ProjectObserver;
use App\Policies\ProjectPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Project::observe(ProjectObserver::class);
        Gate::policy(Project::class, ProjectPolicy::class);
    }
}
