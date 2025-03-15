<?php

namespace App\Http\Controllers;

use App\Enums\ProjectsStatus;
use App\Enums\UserRoles;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use App\Models\Task;
use App\Models\User;
use App\Actions\DisplayProjectsAction;
use App\Events\ProjectCreated;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProjectController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $user = $request->user();
        $query = Project::query();

        $projects = DisplayProjectsAction::handle($query, $user);

        return Inertia::render('Projects/Index', [
            'projects' => ProjectResource::collection($projects),
            'canCreatePolicy' => Auth::user()?->can('create', Project::class),
            'authUserId' => auth()->id()
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
        $this->authorize('create', Project::class);
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $data['manager_assigned_id'] = (int)$request->manager_assigned_id;

        $project = Project::create($data);

        event(new ProjectCreated($project));

        return to_route('projects.index')
                ->with('success', 'Project Created Successfully!');
    }

    public function show(Project $project)
    {
        $project->load(['tasks', 'tasks.developedBy']);

        return Inertia::render('Projects/Show', [
            'project' => new ProjectResource($project),
            'canCreate' => Auth::user()?->can('create', Task::class)
        ]);
    }

    public function edit(Project $project)
    {
        $this->authorize('update', $project);
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
        $this->authorize('update', $project);
        $data = $request->validated();
        $data['manager_assigned_id'] = (int)$request->manager_assigned_id;
        $project->update($data);
        return to_route('projects.index')
                ->with('success', 'Project Updated Successfully!');
    }

    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);
        $project->delete();

        return to_route('projects.index')
                ->with('success', 'Project Deleted Successfully!');
    }
}
