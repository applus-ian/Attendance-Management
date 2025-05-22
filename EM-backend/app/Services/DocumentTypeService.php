<?php

namespace App\Services;

use App\Models\DocumentType;

class DocumentTypeService
{
    // Create Document Type
    public function createDocumentType(array $data)
    {
        return DocumentType::create([
            'name' => $data['name'],
        ]);
    }

    // Read (Get a single document type by ID)
    public function getDocumentTypeById(int $id): ?DocumentType
    {
        return DocumentType::findOrFail($id);
    }

    // Read (Get all document types - will refactor for filters in the future)
    public function getAllDocumentTypes()
    {
        return DocumentType::orderBy('created_at', 'desc')->get(); // Order by latest creation
    }


    // Update Document Type
    public function updateDocumentType(DocumentType $document_type, array $data)
    {
        $document_type->update($data);
        return $document_type;
    }

    // Delete Document Type
    public function deleteDocumentType(DocumentType $document_type): bool
    {
        return $document_type->delete();
    }
}
