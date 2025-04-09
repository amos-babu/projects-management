<?php

namespace App\Http\Controllers;

use App\Actions\CreateNotificationAction;
use App\Enums\TaskStatus;
use App\Enums\UserRoles;
use App\Events\TaskCreatedOrUpdated;
use App\Events\TaskDeleted;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    use AuthorizesRequests;

    public function create(Request $request)
    {
        $this->authorize('create', Task::class);
        $projectID = $request->query('project_id');
        $developers = User::query()->where('role', UserRoles::MEMBER->value)->get();
        $statusOptions = collect(TaskStatus::cases())->map(fn($status)=> [
            'label' => $status->label(),
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
        $this->authorize('create', Task::class);
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $routeId = (int) $data['project_id'];

        $task = Task::create($data);
        $task->refresh();

        $notification = CreateNotificationAction::handle(
            $task->developer_assigned_id,
            $task,
            'created',
            'task');

        broadcast(new TaskCreatedOrUpdated(
            $task,
            'created',
            $notification))->toOthers();

        return to_route('projects.show', $routeId)
                ->with('success', 'Task Created Successfully!');
    }

    public function show(Task $task)
    {
        return Inertia::render('Tasks/Show', [
            'task' => new TaskResource($task)
        ]);
    }

    public function edit(Task $task)
    {
        $this->authorize('update', $task);
        $developers = User::query()->where('role', UserRoles::MEMBER->value)->get();
        $statusOptions = collect(TaskStatus::cases())->map(fn($status)=> [
            'label' => $status->label(),
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
        $this->authorize('update', $task);
        $project = $task->project->id;
        $data = $request->validated();
        $task->update($data);

        $notification = CreateNotificationAction::handle(
            $task->developer_assigned_id,
            $task,
            'updated',
            'task');

        broadcast(new TaskCreatedOrUpdated(
            $task,
            'updated',
            $notification))->toOthers();

        return to_route('projects.show', $project)
                ->with('success', 'Task Updated Successfully!');

    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        $project = $task->project->id;

        $notification = CreateNotificationAction::handle(
            $task->developer_assigned_id,
            $task,
            'deleted',
            'task');

        broadcast(new TaskDeleted($task, $notification))->toOthers();
        $task->delete();

        return to_route('projects.show', $project)
                ->with('success', 'Task Deleted Successfully!');
    }
}
