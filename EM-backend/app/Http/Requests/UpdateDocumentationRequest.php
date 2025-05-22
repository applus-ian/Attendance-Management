<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDocumentationRequest extends FormRequest
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
            'employee_id' => ['required', 'exists:documentations,employee_id'],
            'name' => ['sometimes', 'string', 'max:255', Rule::unique('documentations', 'name')->ignore($this->route('documentation'))],
            'description' => ['nullable', 'string'],
            'file_url' => ['required', 'url'],
            'document_type_id' => ['required', 'exists:documentations,document_type_id'],
            'upload_date' => ['required', 'date', 'after_or_equal:today'],
            'expiry_date' => ['nullable', 'date', 'after_or_equal:upload_date']
        ];
    }
}
