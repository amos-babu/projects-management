<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserRoles;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public $casts = [
        'role' => UserRoles::class
    ];

    public function createdProjects()
    {
        return $this->hasMany(Project::class, 'user_id');
    }

    public function managedProjects()
    {
        return $this->hasMany(Project::class, 'manager_assigned_id');
    }

    public function createdTasks()
    {
        return $this->hasMany(Task::class, 'user_id');
    }

    public function developedTasks()
    {
        return $this->hasMany(Task::class, 'developer_assigned_id');
    }
}
