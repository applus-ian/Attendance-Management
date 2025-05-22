<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::insert([
            // Documentation Permissions
            ['name' => 'documentation_list', 'description' => 'Get All Documentation.'],
            ['name' => 'documentation_view', 'description' => 'Get Single Documentation.'],
            ['name' => 'documentation_create', 'description' => 'Create New Documentation.'],
            ['name' => 'documentation_update', 'description' => 'Update Documentation.'],
            ['name' => 'documentation_delete', 'description' => 'Delete Documentation.'],

            // Document Type Permissions
            ['name' => 'document_type_list', 'description' => 'Get All Document Type.'],
            ['name' => 'document_type_view', 'description' => 'Get Single Document Type.'],
            ['name' => 'document_type_create', 'description' => 'Create New Document Type.'],
            ['name' => 'document_type_update', 'description' => 'Update Document Type.'],
            ['name' => 'document_type_delete', 'description' => 'Delete Document Type.'],

            // Employee Record Permissions
            ['name' => 'employee_list', 'description' => 'Get All Employee Record.'],
            ['name' => 'employee_view', 'description' => 'Get Single Employee Record.'],
            ['name' => 'employee_create', 'description' => 'Create New Employee.'],
            ['name' => 'employee_update', 'description' => 'Update Employee Record.'],
            ['name' => 'employee_delete', 'description' => 'Delete Employee Record.'],

            // Employee Project Permissions
            ['name' => 'employee_project_list', 'description' => 'Get All Employee Project.'],
            ['name' => 'employee_project_view', 'description' => 'Get Single Employee Project.'],
            ['name' => 'employee_project_create', 'description' => 'Create New Employee Project.'],
            ['name' => 'employee_project_update', 'description' => 'Update Employee Project.'],
            ['name' => 'employee_project_delete', 'description' => 'Delete Employee Project.'],

            // Employee Skill Permissions
            ['name' => 'employee_skill_list', 'description' => 'Get All Employee Skill.'],
            ['name' => 'employee_skill_view', 'description' => 'Get Single Employee Skill.'],
            ['name' => 'employee_skill_create', 'description' => 'Create New Employee Skill.'],
            ['name' => 'employee_skill_update', 'description' => 'Update Employee Skill.'],
            ['name' => 'employee_skill_delete', 'description' => 'Delete Employee Skill.'],

            // Employment Type Permissions
            ['name' => 'employment_type_list', 'description' => 'Get All Employment Type.'],
            ['name' => 'employment_type_view', 'description' => 'Get Single Employment Type.'],
            ['name' => 'employment_type_create', 'description' => 'Create New Employment Type.'],
            ['name' => 'employment_type_update', 'description' => 'Update Employment Type.'],
            ['name' => 'employment_type_delete', 'description' => 'Delete Employment Type.'],

            // Project Records Permissions
            ['name' => 'project_list', 'description' => 'Get All Project Record.'],
            ['name' => 'project_view', 'description' => 'Get Single Project Record.'],
            ['name' => 'project_create', 'description' => 'Create New Project.'],
            ['name' => 'project_update', 'description' => 'Update Project Record.'],
            ['name' => 'project_delete', 'description' => 'Delete Project Record.'],

            // Project Role Permissions
            ['name' => 'project_role_list', 'description' => 'Get All Project Role.'],
            ['name' => 'project_role_view', 'description' => 'Get Single Project Role.'],
            ['name' => 'project_role_create', 'description' => 'Create New Project Role.'],
            ['name' => 'project_role_update', 'description' => 'Update Project Role.'],
            ['name' => 'project_role_delete', 'description' => 'Delete Project Role.'],

            // Job Position Permissions
            ['name' => 'job_position_list', 'description' => 'Get All Job Position.'],
            ['name' => 'job_position_view', 'description' => 'Get Single Job Position.'],
            ['name' => 'job_position_create', 'description' => 'Create New Job Position.'],
            ['name' => 'job_position_update', 'description' => 'Update Job Position.'],
            ['name' => 'job_position_delete', 'description' => 'Delete Job Position.'],

            // Location Assignment Permissions
            ['name' => 'location_assignment_list', 'description' => 'Get All Location Assignment.'],
            ['name' => 'location_assignment_view', 'description' => 'Get Single Location Assignment.'],
            ['name' => 'location_assignment_create', 'description' => 'Create New Location Assignment.'],
            ['name' => 'location_assignment_update', 'description' => 'Update Location Assignment.'],
            ['name' => 'location_assignment_delete', 'description' => 'Delete Location Assignment.'],

            // Country Assign Permissions
            ['name' => 'country_assign_list', 'description' => 'Get All Country Assign.'],
            ['name' => 'country_assign_view', 'description' => 'Get Single Country Assign.'],
            ['name' => 'country_assign_create', 'description' => 'Create New Country Assign.'],
            ['name' => 'country_assign_update', 'description' => 'Update Country Assign.'],
            ['name' => 'country_assign_delete', 'description' => 'Delete Country Assign.'],

            // Office Assign Permissions
            ['name' => 'office_assign_list', 'description' => 'Get All Office Assign.'],
            ['name' => 'office_assign_view', 'description' => 'Get Single Office Assign.'],
            ['name' => 'office_assign_create', 'description' => 'Create New Office Assign.'],
            ['name' => 'office_assign_update', 'description' => 'Update Office Assign.'],
            ['name' => 'office_assign_delete', 'description' => 'Delete Office Assign.'],

            // Team Assign Permissions
            ['name' => 'team_assign_list', 'description' => 'Get All Team Assign.'],
            ['name' => 'team_assign_view', 'description' => 'Get Single Team Assign.'],
            ['name' => 'team_assign_create', 'description' => 'Create New Team Assign.'],
            ['name' => 'team_assign_update', 'description' => 'Update Team Assign.'],
            ['name' => 'team_assign_delete', 'description' => 'Delete Team Assign.'],

            // Department Assign Permissions
            ['name' => 'department_assign_list', 'description' => 'Get All Department Assign.'],
            ['name' => 'department_assign_view', 'description' => 'Get Single Department Assign.'],
            ['name' => 'department_assign_create', 'description' => 'Create New Department Assign.'],
            ['name' => 'department_assign_update', 'description' => 'Update Department Assign.'],
            ['name' => 'department_assign_delete', 'description' => 'Delete Department Assign.'],

            // Role Permissions
            ['name' => 'role_list', 'description' => 'Get All Role.'],
            ['name' => 'role_view', 'description' => 'Get Single Role.'],
            ['name' => 'role_create', 'description' => 'Create New Role.'],
            ['name' => 'role_update', 'description' => 'Update Role.'],
            ['name' => 'role_delete', 'description' => 'Delete Role.'],

            // Skill Permissions
            ['name' => 'skill_list', 'description' => 'Get All Skill.'],
            ['name' => 'skill_view', 'description' => 'Get Single Skill.'],
            ['name' => 'skill_create', 'description' => 'Create New Skill.'],
            ['name' => 'skill_update', 'description' => 'Update Skill.'],
            ['name' => 'skill_delete', 'description' => 'Delete Skill.'],

            // Skill Category Permissions
            ['name' => 'skill_category_list', 'description' => 'Get All Skill Category.'],
            ['name' => 'skill_category_view', 'description' => 'Get Single Skill Category.'],
            ['name' => 'skill_category_create', 'description' => 'Create New Skill Category.'],
            ['name' => 'skill_category_update', 'description' => 'Update Skill Category.'],
            ['name' => 'skill_category_delete', 'description' => 'Delete Skill Category.'],

            // User Permissions
            ['name' => 'user_register', 'description' => 'Create a new User.'],
            ['name' => 'user_change_password', 'description' => 'Change Password of a User.'],

            // User Role Permissions
            ['name' => 'user_role_list', 'description' => 'Get All User Role.'],
            ['name' => 'user_role_view', 'description' => 'Get Single User Role.'],
            ['name' => 'user_role_create', 'description' => 'Create New User Role.'],
            ['name' => 'user_role_update', 'description' => 'Update User Role.'],
            ['name' => 'user_role_delete', 'description' => 'Delete User Role.'],
        ]);
    }
}
