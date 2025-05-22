<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePersonalInfoRequest extends FormRequest
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
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'suffix' => ['nullable', 'string', 'max:50'],
            'gender' => ['nullable', 'in:male,female,other'],
            'birthdate' => ['required', 'date', 'before:today'],
            'civil_status' => ['required', 'in:single,married,widowed,divorced,separated,anulled'],
            'nationality' => ['required', 'string', 'max:100'],
            'phone_number' => ['required', 'string', 'max:20', Rule::unique('employees', 'phone_number')->ignore($this->user()->employee->id)],
            'emergency_contact1' => ['required', 'string', 'max:20'],
            'emergency_contact2' => ['required', 'string', 'max:20'],
            'email' => ['required', 'email', 'max:150', Rule::unique('employees', 'email')->ignore($this->user()->employee->id)],
        ];
    }
}
