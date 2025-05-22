<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\RolePermission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdminRoleId = Role::where('name', 'Super Admin')->first()->id;
        $permissions = Permission::all();

        foreach ($permissions as $permission) {
            RolePermission::create([
                'role_id' => $superAdminRoleId,
                'permission_id' => $permission->id,
            ]);
        }
    }
}
