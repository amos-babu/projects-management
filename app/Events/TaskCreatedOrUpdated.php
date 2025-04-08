<?php

namespace App\Events;

use App\Http\Resources\NotificationResource;
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
            "id" =>$this->task->id,
            "title" =>$this->task->title,
            "description" =>$this->task->description,
            "developer_assigned_id" =>$this->task->developer_assigned_id,
            "status" => [
                "label" => $this->task->status->label(),
                "value" => $this->task->status->value
            ],
            "start_date" =>$this->task->start_date,
            "end_date" =>$this->task->end_date,
            "actionType" => $this->actionType,
            "notification" => new NotificationResource($this->notification)
        ];
    }
}
