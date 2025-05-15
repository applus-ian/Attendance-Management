<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class UserRoleSeeder extends Seeder
{
    public function run()
    {

        $user = User::find(1);

        $role = Role::where('name', 'admin')->first();

        $user->roles()->attach($role->role_id);
    }
}
