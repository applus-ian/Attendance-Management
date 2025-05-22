<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSkillCategoryRequest;
use App\Http\Requests\UpdateSkillCategoryRequest;
use App\Models\SkillCategory;
use App\Services\SkillCategoryService;
use Illuminate\Http\JsonResponse;

class SkillCategoryController extends Controller
{
    protected $skillCategoryService;

    public function __construct(SkillCategoryService $skillCategoryService)
    {
        $this->skillCategoryService = $skillCategoryService;
    }

    // Create Skill Category Method
    public function create(CreateSkillCategoryRequest $request): JsonResponse
    {
        $this->skillCategoryService->createSkillCategory($request->validated());

        return response()->json(['message' => 'Skill Category created successfully!'], 201);
    }

    // Update Skill Category Method
    public function update(UpdateSkillCategoryRequest $request, SkillCategory $skillCategory): JsonResponse
    {
        // Proceed with updating the skill category's details
        $updated_skill_category = $this->skillCategoryService->updateSkillCategory($skillCategory, $request->validated());

        // Return the updated skill category as a JSON response
        return response()->json($updated_skill_category, 200);
    }

    // Get All Skill Categories Method
    public function index(): JsonResponse
    {
        $skill_categories = $this->skillCategoryService->getAllSkillCategories();

        return response()->json($skill_categories, 200);
    }

    // Get Single Skill Category Method
    public function show(SkillCategory $skillCategory): JsonResponse
    {
        return response()->json($skillCategory, 200);
    }

    // Delete Skill Category Method
    public function destroy(SkillCategory $skillCategory): JsonResponse
    {
        $this->skillCategoryService->deleteSkillCategory($skillCategory);

        return response()->json(['message' => 'Skill Category deleted successfully!'], 200);
    }
}
