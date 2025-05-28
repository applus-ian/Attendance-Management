<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\EmployeeSeeder;
use Database\Seeders\UserRoleSeeder;
use Database\Seeders\DepartmentSeeder;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\JobPositionSeeder;
use Database\Seeders\NotificationSeeder;
use Database\Seeders\RolePermissionSeeder;
use Database\Seeders\EmployeeAddressSeeder;
use Database\Seeders\TimesheetSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            JobPositionSeeder::class,
            EmployeeAddressSeeder::class,
            DepartmentSeeder::class,
            EmployeeSeeder::class,
            PermissionSeeder::class,
            ScheduleSeeder::class,
            AssignedScheduleSeeder::class,
            TimesheetSeeder::class,
            // UserSeeder::class,
            // RoleSeeder::class,
            // RolePermissionSeeder::class,
            // UserRoleSeeder::class,
            // NotificationSeeder::class,
        ]);
    }
}
