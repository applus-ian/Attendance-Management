<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Seeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::where('name', 'admin')->first();

        $timelog = Permission::where('name', 'create_timelog')->value('permission_id');
        $view_all_request = Permission::where('name', 'view_all_request')->value('permission_id');
        $view_request = Permission::where('name', 'view_request')->value('permission_id');
        $create_request = Permission::where('name', 'create_request')->value('permission_id');
        $approve_request = Permission::where('name', 'approve_request')->value('permission_id');
        $reject_request = Permission::where('name', 'reject_request')->value('permission_id');
        $update_schedule = Permission::where('name', 'update_schedule')->value('permission_id');

        $admin->permissions()->attach([$timelog, $view_all_request, $view_request, $create_request, $approve_request, $reject_request, $update_schedule]);
    }
}
