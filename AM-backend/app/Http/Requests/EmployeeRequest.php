<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|string|in:male,female,other',
            'civil_status' => 'required|string|in:single,married,divorced,widowed',
            'email' => 'required|email|unique:employees,email',
            'phone_number' => 'required|string|max:15',
            'dob' => 'required|date',
            'dept_id' => 'required|exists:departments,dept_id',
            'job_position_id' => 'required|exists:job_positions,job_position_id',
            'address_id' => 'nullable|exists:employee_addresses,address_id',
            'status' => 'required|string|in:active,inactive',
            'date_hired' => 'required|date',
        ];
    }
}
