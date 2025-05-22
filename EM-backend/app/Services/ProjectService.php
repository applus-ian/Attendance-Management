<?php

namespace App\Services;

use App\Http\Resources\ProjectResource;
use App\Models\Project;

class ProjectService
{
    // Create Project
    public function createProject(array $data)
    {
        return Project::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
        ]);
    }

    // Read (Get a single project by ID)
    public function getProjectById(int $id): ?Project
    {
        return Project::findOrFail($id);
    }

    // Read (Get all projects - will refactor for filters in the future)
    public function getAllProjects()
    {
        $projects = Project::with(['employeeProject.employee'])->get();

        return ProjectResource::collection($projects);
    }

    // Update Project
    public function updateProject(Project $project, array $data)
    {
        $project->update($data);
        return $project;
    }

    // Delete Project
    public function deleteProject(Project $project): bool
    {
        return $project->delete();
    }
}
