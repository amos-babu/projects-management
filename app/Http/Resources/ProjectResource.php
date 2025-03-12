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
            "managed_by" =>new UserResource($this->managedBy),
            "created_by" => new UserResource($this->createdBy),
            "tasks" => TaskResource::collection($this->tasks)
        ];
    }
}
