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
            'set active',
            'set inactive',
            'delete user',
            'view timelogs',
            'view timelog',
            'clock in',
            'clock out',
            'view timesheets',
            'view timesheet',
            'create timesheet',
            'view schedules',
            'view schedule',
            'create schedule',
            'update schedule',
            'delete schedule',
            'view requests',
            'view request',
            'create requests',
            'approve requests',
            'reject requests',
            'view auditlogs',
            'view auditlog',
            'create auditlogs',
            'view holidays',
            'create custom holiday',
            'edit holiday',
            'remove holidays',
            'sync holidays',
            'view assigned schedules',
            'view assigned schedule',
            'create assigned schedule',
            'update assigned schedule',
            'delete assigned schedule'
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
            'view user',
            'set active',
            'set inactive',
            'delete user',
            'view timelogs',
            'view timelog',
            'clock in',
            'clock out',
            'view timesheets',
            'view timesheet',
            'create timesheet',
            'view schedules',
            'view schedule',
            'create schedule',
            'update schedule',
            'delete schedule',
            'view requests',
            'view request',
            'create requests',
            'approve requests',
            'reject requests',
            'create auditlogs',
            'view assigned schedules',
            'view assigned schedule',
            'create assigned schedule',
            'update assigned schedule',
            'delete assigned schedule'

        ]);
        $employeeRole->syncPermissions([
            'view user',
            'clock in',
            'clock out',
            'view timesheet',
            'view request',
            'create requests',
            'view timelog',
            'create auditlogs'
        ]);

        $superAdmin = User::where('email', 'john1@example.com')->first();
        $employee = User::where('email', 'john2@example.com')->first();
        $admin = User::where('email', 'john3@example.com')->first();

        $superAdmin->assignRole($superAdminRole);
        $employee->assignRole($employeeRole);
        $admin->assignRole($adminRole);
    }
}
