<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateDocumentationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => ['required', 'exists:employees,id'], // Updated to check employees table
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:documentations,name,NULL,id,employee_id,' . $this->employee_id // Updated for unique name per employee
            ],
            'description' => ['nullable', 'string'],
            'file_url' => ['required', 'url'],
            'document_type_id' => ['required', 'exists:document_types,id'], // Updated to check document_types table
            'upload_date' => ['required', 'date', 'after_or_equal:today'],
            'expiry_date' => ['nullable', 'date', 'after_or_equal:upload_date'],
        ];
    }
}
