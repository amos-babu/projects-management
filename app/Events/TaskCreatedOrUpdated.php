<?php

namespace App\Events;

use App\Http\Resources\NotificationResource;
use App\Http\Resources\TaskResource;
use App\Models\Notification;
use App\Models\Task;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TaskCreatedOrUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Task $task;
    public string $actionType;
    public Notification $notification;

    public function __construct(Task $task, string $actionType, Notification $notification)
    {
        $this->task = $task;
        $this->actionType = $actionType;
        $this->notification = $notification;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('task.'.$this->task->developer_assigned_id),
        ];
    }


    public function broadcastWith(){
        return [
            "task" => new TaskResource($this->task),
            "actionType" => $this->actionType,
            "notification" => new NotificationResource($this->notification)
        ];
    }
}
