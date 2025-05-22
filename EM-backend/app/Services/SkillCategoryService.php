<?php

namespace App\Services;

use App\Models\SkillCategory;

class SkillCategoryService
{
    // Create Skill Category
    public function createSkillCategory(array $data)
    {
        return SkillCategory::create([
            'name' => $data['name'],
        ]);
    }

    // Read (Get a single skill category by ID)
    public function getSkillCategoryById(int $id): ?SkillCategory
    {
        return SkillCategory::findOrFail($id);
    }

    // Read (Get all skill categories - will refactor for filters in the future)
    public function getAllSkillCategories()
    {
        return SkillCategory::all();
    }

    // Update Skill Category
    public function updateSkillCategory(SkillCategory $skill_category, array $data)
    {
        $skill_category->update($data);
        return $skill_category;
    }

    // Delete Skill Category
    public function deleteSkillCategory(SkillCategory $skill_category): bool
    {
        return $skill_category->delete();
    }
}
