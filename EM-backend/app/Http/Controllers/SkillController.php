<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSkillRequest;
use App\Http\Requests\UpdateSkillRequest;
use App\Models\Skill;
use App\Services\SkillService;
use Illuminate\Http\JsonResponse;

class SkillController extends Controller
{
    protected $skillService;

    public function __construct(SkillService $skillService)
    {
        $this->skillService = $skillService;
    }

    // Create Skill Method
    public function create(CreateSkillRequest $request): JsonResponse
    {
        $this->skillService->createSkill($request->validated());

        return response()->json(['message' => 'Skill created successfully!'], 201);
    }

    // Update Skill Method
    public function update(UpdateSkillRequest $request, Skill $skill): JsonResponse
    {
        $updatedSkill = $this->skillService->updateSkill($skill, $request->validated());

        return response()->json($updatedSkill, 200);
    }

    // Get All Skills Method
    public function index(): JsonResponse
    {
        $skills = $this->skillService->getAllSkills();

        return response()->json($skills, 200);
    }

    // Get Single Skill Method
    public function show(Skill $skill): JsonResponse
    {
        return response()->json($skill, 200);
    }

    // Delete Skill Method
    public function destroy(Skill $skill): JsonResponse
    {
        $this->skillService->deleteSkill($skill);

        return response()->json(['message' => 'Skill deleted successfully!'], 200);
    }
}
