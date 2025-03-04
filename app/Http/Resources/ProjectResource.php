<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\TaskResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "user_id" => $this->user_id,
            "status" => $this->status->label(),
            "start_date" => $this->start_date,
            "end_date" => $this->end_date,
            "manager_assigned" => $this->manager_assigned,
            "tasks" => TaskResource::collection($this->tasks)
        ];
    }
}
