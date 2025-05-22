<?php

namespace App\Services;

use App\Models\ProjectRole;

class ProjectRoleService
{
    // Create Project Role
    public function createProjectRole(array $data)
    {
        return ProjectRole::create([
            'name' => $data['name'],
        ]);
    }

    // Read (Get a single project role by ID)
    public function getProjectRoleById(int $id): ?ProjectRole
    {
        return ProjectRole::findOrFail($id);
    }

    // Read (Get all project roles - will refactor for filters in the future)
    public function getAllProjectRoles()
    {
        return ProjectRole::all();
    }

    // Update Project Role
    public function updateProjectRole(ProjectRole $project_role, array $data)
    {
        $project_role->update($data);
        return $project_role;
    }

    // Delete Project Role
    public function deleteProjectRole(ProjectRole $project_role): bool
    {
        return $project_role->delete();
    }
}
