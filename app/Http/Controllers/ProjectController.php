<?php

namespace App\Http\Controllers;

use App\Enums\ProjectsStatus;
use App\Enums\UserRoles;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ProjectController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $projects = Project::query()
                    ->where(fn($query) => Gate::allows('view', $query))
                    ->latest()
                    ->paginate();

        return Inertia::render('Projects/Index', [
            'projects' => ProjectResource::collection($projects),
            'can' => [
                // 'update' => auth()->user()?->can('update', ),
            ],
        ]);
    }

    public function create()
    {
        $this->authorize('create', Project::class);
        $managers = User::query()->where('role', UserRoles::MANAGER->value)->get();
        $statusOptions = collect(ProjectsStatus::cases())->map(fn($status)=> [
            'name' => $status->label(),
            'value' => $status->value
        ]);

        return Inertia::render('Projects/Create', [
            'statusOptions' => $statusOptions,
            'managers' => UserResource::collection($managers),
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $data['manager_assigned_id'] = (int)$request->manager_assigned_id;

        Project::create($data);

        return to_route('projects.index')->with('success', 'Project Successfully Created!');
    }

    public function show(Project $project)
    {
        $project->load('tasks');

        return Inertia::render('Projects/Show', [
            'project' => new ProjectResource($project),
        ]);
    }

    public function edit(Project $project)
    {
        $projectManagers = User::query()->where('role', UserRoles::MANAGER->value)->get();
        $statusOptions = collect(ProjectsStatus::cases())->map(fn($status)=> [
            'name' => $status->label(),
            'value' => $status->value
        ]);

        return Inertia::render('Projects/Edit', [
            'statusOptions' => $statusOptions,
            'managers' => UserResource::collection($projectManagers),
            'project' => new ProjectResource($project),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $data['manager_assigned_id'] = (int)$request->manager_assigned_id;
        $project->update($data);
        return to_route('projects.index')->with('success', 'Project Successfully Updated!');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return to_route('projects.index')->with('success', 'Project Successfully Deleted!');
    }
}
