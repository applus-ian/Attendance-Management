<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'view users',
            'view user',
            'delete users',
            'set active',
            'set inactive',
            'view roles',
            'assign roles',
            'create request',
            'approve request',
            'reject request',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $superAdminRole = Role::firstOrCreate(['name' => 'super_admin']);
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $employeeRole = Role::firstOrCreate(['name' => 'employee']);


        $superAdminRole->syncPermissions(Permission::all());
        $adminRole->syncPermissions([
            'view users',
            'set active',
            'set inactive',
            'view roles',
        ]);
        $employeeRole->syncPermissions(['view user']);

        $superAdmin = User::where('email', 'john1@example.com')->first();

        $superAdmin->assignRole($superAdminRole);
    }
}
