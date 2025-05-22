<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateEmployeeRequest extends FormRequest
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
            'region' => ['required', 'string', 'max:100'],
            'province' => ['required', 'string', 'max:100'],
            'city_or_municipality' => ['required', 'string', 'max:100'],
            'barangay' => ['required', 'string', 'max:100'],
            'street' => ['required', 'string', 'max:150'],
            'phone_number' => ['required', 'string', 'max:20', 'unique:employees,phone_number'],
            'emergency_contact1' => ['required', 'string', 'max:20'],
            'emergency_contact2' => ['required', 'string', 'max:20'],
            'email' => ['required', 'email', 'max:150', 'unique:employees,email'],
            'job_position_id' => ['required', 'exists:job_positions,id'],
            'date_hired' => ['required', 'date'],
            'employment_type_id' => ['required', 'exists:employment_types,id'],
            'manager_id' => ['nullable', 'exists:employees,id'],
            'profile_pic_url' => ['nullable', 'string', 'url'],
            'tin_number' => ['nullable', 'string'],
            'sss_number' => ['nullable', 'string'],
            'pagibig_number' => ['nullable', 'string'],
            'philhealth_number' => ['nullable', 'string'],
            'bank_number' => ['nullable', 'string'],
        ];
    }
}
