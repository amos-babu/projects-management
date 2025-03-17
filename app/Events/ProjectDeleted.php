<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProjectDeleted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $managerId;
    public $actionType = 'deleted';
    /**
     * Create a new event instance.
     */
    public function __construct($managerId)
    {
        $this->managerId = $managerId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('projects.' .$this->managerId),
        ];
    }

    public function broadcastWith()
    {
        return [
            'actionType' => $this->actionType,
        ];
    }
}
