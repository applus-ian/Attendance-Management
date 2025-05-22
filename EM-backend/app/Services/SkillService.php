<?php

namespace App\Services;

use App\Http\Resources\SkillResource;
use App\Models\Skill;

class SkillService
{
    // Create Skill
    public function createSkill(array $data)
    {
        return Skill::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'skill_category_id' => $data['skill_category_id'],
        ]);
    }

    // Read (Get a single skill by ID)
    public function getSkillById(int $id): ?Skill
    {
        return Skill::findOrFail($id);
    }

    // Read (Get all skills - will refactor for filters in the future)
    public function getAllSkills()
    {
        $skill = Skill::all();
        return SkillResource::collection($skill->load('skillCategory'));
    }

    // Update Skill
    public function updateSkill(Skill $skill, array $data)
    {
        $skill->update($data);
        return $skill;
    }

    // Delete Skill
    public function deleteSkill(Skill $skill): bool
    {
        return $skill->delete();
    }
}
