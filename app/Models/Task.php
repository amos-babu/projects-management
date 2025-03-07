<?php

namespace App\Models;

use App\Enums\TaskStatus;
use App\Observers\TaskObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'project_id',
        'status',
        'start_date',
        'end_date',
        'developer_assigned_id'
    ];

    public $casts = [
        'status' => TaskStatus::class
    ];

    public function user()
    {
        return $this->belongsTo(User::class,);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
