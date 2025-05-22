<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDocumentTypeRequest;
use App\Http\Requests\UpdateDocumentTypeRequest;
use App\Models\DocumentType;
use App\Services\DocumentTypeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DocumentTypeController extends Controller
{
    protected $documentTypeService;

    public function __construct(DocumentTypeService $documentTypeService)
    {
        $this->documentTypeService = $documentTypeService;
    }

    // Create Document Type Method
    public function create(CreateDocumentTypeRequest $request): JsonResponse
    {
        $this->documentTypeService->createDocumentType($request->validated());

        return response()->json(['message' => 'Document Type created successfully!'], 201);
    }

    // Update Document Type Method
    public function update(UpdateDocumentTypeRequest $request, DocumentType $documentType): JsonResponse
    {
        // Proceed with updating the document type's details
        $updated_document_type = $this->documentTypeService->updateDocumentType($documentType, $request->validated());

        // Return the updated document type as a JSON response
        return response()->json($updated_document_type, 200);
    }

    // Get All Document Types Method
    public function index(): JsonResponse
    {
        $document_types = $this->documentTypeService->getAllDocumentTypes();

        return response()->json($document_types, 200);
    }

    // Get Single Document Type Method
    public function show(DocumentType $documentType): JsonResponse
    {
        return response()->json($documentType, 200);
    }

    // Delete Document Type Method
    public function destroy(DocumentType $documentType): JsonResponse
    {
        $this->documentTypeService->deleteDocumentType($documentType);

        return response()->json(['message' => 'Document Type deleted successfully!'], 200);
    }
}
