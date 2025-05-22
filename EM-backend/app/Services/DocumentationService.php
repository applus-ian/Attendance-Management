<?php

namespace App\Services;

use App\Models\Documentation;

class DocumentationService
{
    // Create Documentation
    public function createDocumentation(array $data)
    {
        return Documentation::create([
            'employee_id' => $data['employee_id'],
            'name' => $data['name'],
            'description' => $data['description'],
            'file_url' => $data['file_url'],
            'document_type_id' => $data['document_type_id'],
            'upload_date' => $data['upload_date'],
            'expiry_date' => $data['expiry_date'],
        ]);
    }

    // Read (Get a single documentation by ID)
    public function getDocumentationById(int $id): ?Documentation
    {
        return Documentation::findOrFail($id);
    }

    // Read (Get all documentions - will refactor for filters in the future)
    public function getAllDocumentations()
    {
        return Documentation::all();
    }

    // Update Documentation
    public function updateDocumentation(Documentation $documentation, array $data)
    {
        $documentation->update($data);
        return $documentation;
    }

    // Delete Documentation
    public function deleteDocumentation(Documentation $documentation): bool
    {
        return $documentation->delete();
    }
}
