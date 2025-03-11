<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
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
            "title" => $this->title,
            "description" => $this->description,
            "project_id" => $this->project_id,
            "status" => [
                'label' => $this->status->label(),
                'value' => $this->status->value
                ],
            "start_date" => $this->start_date,
            "end_date" => $this->end_date,
            "developed_by" => new UserResource($this->developedBy)
        ];
    }
}
