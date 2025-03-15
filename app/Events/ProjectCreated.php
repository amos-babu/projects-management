<?php

namespace App\Events;

use App\Http\Resources\UserResource;
use App\Models\Project;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProjectCreated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Project $project;

    public function __construct(Project $project)
    {
        $this->project = $project;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('projects'),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->project->id,
            'name' => $this->project->name,
            'status' => $this->project->status->label(),
            'managed_by' =>new UserResource($this->project->managedBy),
        ];
    }
}
