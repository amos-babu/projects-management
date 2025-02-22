<?php

namespace App\Http\Resources;

use App\Enums\ProjectsStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
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
            "manager_assigned" => $this->manager_assigned
        ];
    }
}
