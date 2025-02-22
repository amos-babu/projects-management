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
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::query()->latest()->paginate();

        return Inertia::render('Projects/Index', [
            'projects' => ProjectResource::collection($projects),
        ]);
    }

    public function create()
    {
        $managers = User::query()->where('role', UserRoles::MANAGER->value)->get();
        $statusOptions = collect(ProjectsStatus::cases())->map(fn($status)=> [
            'name' => $status->name,
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

        Project::create($data);

        return to_route('projects.index')->with('success', 'Project Successfully Created!');
    }

    public function show(Project $project)
    {
        return Inertia::render('Projects/Show', [
            'project' => new ProjectResource($project),
        ]);
    }

    public function edit(Project $project)
    {
        $managers = User::query()->where('role', UserRoles::MANAGER->value)->get();
        $statusOptions = collect(ProjectsStatus::cases())->map(fn($status)=> [
            'name' => $status->name,
            'value' => $status->value
        ]);

        return Inertia::render('Projects/Edit', [
            'statusOptions' => $statusOptions,
            'managers' => UserResource::collection($managers),
            'project' => new ProjectResource($project),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $project->update($data);
        return to_route('projects.index')->with('success', 'Project Successfully Updated!');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return to_route('projects.index')->with('success', 'Project Successfully Deleted!');
    }
}
