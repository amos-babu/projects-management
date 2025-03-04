<?php

namespace App\Http\Controllers;

use App\Enums\TaskStatus;
use App\Enums\UserRoles;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        //
    }

    public function create(Request $request)
    {
        $projectID = $request->query('project_id');
        $developers = User::query()->where('role', UserRoles::MEMBER->value)->get();
        $statusOptions = collect(TaskStatus::cases())->map(fn($status)=> [
            'name' => $status->name,
            'value' => $status->value
        ]);
        return Inertia::render('Tasks/Create', [
            'developers' => UserResource::collection($developers),
            'statusOptions' => $statusOptions,
            'projectID' => $projectID
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $data['project_id'] = (int)$request->project_id;

        Task::create($data);

        return to_route('projects.show', $request->project_id)
        ->with('success', 'Task Created Successfully!');
    }

    public function show(Task $task)
    {
        //
    }

    public function edit(Task $task)
    {
        $developers = User::query()->where('role', UserRoles::MEMBER->value)->get();
        $statusOptions = collect(TaskStatus::cases())->map(fn($status)=> [
            'name' => $status->name,
            'value' => $status->value
        ]);
        return Inertia::render('Tasks/Edit', [
            'developers' => UserResource::collection($developers),
            'statusOptions' => $statusOptions,
            'task' => new TaskResource($task)
        ]);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $project = $task->project->id;
        $task->update($request->validated());

        return to_route('projects.show', $project)->with('success', 'Task Deleted Successfully!');

    }

    public function destroy(Task $task)
    {
        $project = $task->project->id;
        $task->delete();

        return to_route('projects.show', $project)->with('success', 'Task Deleted Successfully!');
    }
}
