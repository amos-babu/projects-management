<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserRoles;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
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


    /**
     * Get all of the projects for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

     public function hasRole(UserRoles $role): bool
     {
        return $this->role === $role->value;
     }

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
