<?php

namespace App\Events;

use App\Http\Resources\NotificationResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Notification;
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

class ProjectCreatedOrUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Project $project;
    public Notification $notification;
    public User $user;
    public string $actionType;

    public function __construct(Project $project, Notification $notification, User $user, string $actionType)
    {
        $this->project = $project;
        $this->notification = $notification;
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
            "project" => new ProjectResource($this->project),

            "actionType" => $this->actionType,
            "notification" => new NotificationResource($this->notification)
        ];
    }
}
