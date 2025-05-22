<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDocumentationRequest;
use App\Http\Requests\UpdateDocumentationRequest;
use App\Models\Documentation;
use App\Services\DocumentationService;
use Illuminate\Http\JsonResponse;

class DocumentationController extends Controller
{
    protected $documentationService;

    public function __construct(DocumentationService $documentationService)
    {
        $this->documentationService = $documentationService;
    }

    // Create Documentation Method
    public function create(CreateDocumentationRequest $request): JsonResponse
    {
        $this->documentationService->createDocumentation($request->validated());

        return response()->json(['message' => 'Documentation created successfully!'], 201);
    }

    // Update Documentation Method
    public function update(UpdateDocumentationRequest $request, Documentation $documentation): JsonResponse
    {
        $updatedDocumentation = $this->documentationService->updateDocumentation($documentation, $request->validated());

        return response()->json($updatedDocumentation, 200);
    }

    // Get All Documentations Method
    public function index(): JsonResponse
    {
        $documentations = $this->documentationService->getAllDocumentations();

        return response()->json($documentations, 200);
    }

    // Get Single Documentation Method
    public function show(Documentation $documentation): JsonResponse
    {
        return response()->json($documentation, 200);
    }

    // Delete Documentation Method
    public function destroy(Documentation $documentations): JsonResponse
    {
        $this->documentationService->deleteDocumentation($documentations);

        return response()->json(['message' => 'Documentation deleted successfully!'], 200);
    }
}
