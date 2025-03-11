<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\TaskResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public static $wrap = null;
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
            "status" => [
                'label' => $this->status->label(),
                'value' => $this->status->value
                ],
            "permissions" => [
                "canUpdate" => $request->user()?->can('update', $this->resource),
                "canDelete" => $request->user()?->can('delete', $this->resource)
            ],
            "start_date" => $this->start_date,
            "end_date" => $this->end_date,
            "manager_assigned_id" => $this->manager_assigned_id,
            "tasks" => TaskResource::collection($this->tasks)
        ];
    }
}
