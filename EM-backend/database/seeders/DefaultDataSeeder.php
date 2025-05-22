<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DefaultDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            JobPositionSeeder::class,
            RoleSeeder::class,
            PermissionSeeder::class,
            EmploymentTypeSeeder::class,
            DocumentTypeSeeder::class,
            SkillCategorySeeder::class,
            ProjectRoleSeeder::class,
            ProjectSeeder::class,
            SkillSeeder::class,

            SuperAdminSeeder::class,
            UserRoleSeeder::class,
            RolePermissionSeeder::class,

            DocumentationSeeder::class,
            EmployeeProjectSeeder::class,
            EmployeeSkillSeeder::class,
            EmploymentStatusHistorySeeder::class,

            DepartmentAssignSeeder::class,
            TeamAssignSeeder::class,
            OfficeAssignSeeder::class,
            CountryAssignSeeder::class,
            LocationAssignmentSeeder::class,
        ]);
    }
}
