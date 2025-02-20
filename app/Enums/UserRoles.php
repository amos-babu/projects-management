<?php

namespace App\Enums;

enum UserRoles: string
{
    case ADMIN = 'admin';
    case MANAGER = 'manager';
    case MEMBER = 'member';

    public function label(): string {
        return match($this){
            UserRoles::ADMIN => 'Admin',
            UserRoles::MANAGER => 'Manager',
            UserRoles::MEMBER=> 'Member'
        };
    }
}
