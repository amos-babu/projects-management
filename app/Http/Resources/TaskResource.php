<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
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
            "title" => $this->title,
            "description" => $this->description,
            "project_id" => $this->project_id,
            "status" => $this->status->label(),
            "start_date" => $this->start_date,
            "end_date" => $this->end_date,
            "assigned_to" => new UserResource($this->user)
        ];
    }
}
