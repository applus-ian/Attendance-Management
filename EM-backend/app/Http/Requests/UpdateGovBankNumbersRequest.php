<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGovBankNumbersRequest extends FormRequest
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
            'tin_number' => ['required', 'string', 'max:100'],
            'sss_number' => ['required', 'string', 'max:100'],
            'pagibig_number' => ['required', 'string', 'max:100'],
            'philhealth_number' => ['required', 'string', 'max:100'],
            'bank_number' => ['required', 'string', 'max:150'],
        ];
    }
}
