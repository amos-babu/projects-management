<?php

namespace App\Events;

use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProjectCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Project $project;
    public User $user;
    public string $actionType;

    public function __construct(Project $project, User $user, string $actionType)
    {
        $this->project = $project;
        $this->user = $user;
        $this->actionType = $actionType;
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('projects.' .$this->project->managedBy->id),
        ];
    }

    public function broadcastWith()
    {
        return [
           "id" => $this->project->id,
            "name" => $this->project->name,
            "description" => $this->project->description,
            "status" => [
                'label' => $this->project->status->label(),
                'value' => $this->project->status->value
                ],
            "permissions" => [
                "canUpdate" => $this->user?->can('update', $this->project->resource),
                "canDelete" => $this->user?->can('delete', $this->project->resource)
            ],
            "start_date" => $this->project->start_date,
            "end_date" => $this->project->end_date,
            "managed_by" =>new UserResource($this->project->managedBy),
            "created_by" => new UserResource($this->project->createdBy),
            "tasks" => TaskResource::collection($this->project->tasks),
            'actionType' => $this->actionType
        ];
    }
}
