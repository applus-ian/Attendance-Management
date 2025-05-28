<?php

namespace App\Http\Requests;

use App\Models\Timelogs;
use Illuminate\Foundation\Http\FormRequest;

class TimelogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Adjust authorization logic if needed
    }

    public function rules(): array
    {
        return [
            'emp_id' => 'required|exists:employees,emp_id',
            'timelog_type' => 'required|in:clock_in,clock_out',
            
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $empId = $this->input('emp_id');
            $timelogType = $this->input('timelog_type');

            $lastTimelog = Timelogs::where('emp_id', $empId)->latest()->first();

            if ($timelogType === 'clock_in') {
                if ($lastTimelog && $lastTimelog->timelog_type === 'clock_in') {
                    $validator->errors()->add('timelog_type', 'Employee is already clocked in.');
                }
            }

            if ($timelogType === 'clock_out') {
                if (!$lastTimelog || $lastTimelog->timelog_type !== 'clock_in') {
                    $validator->errors()->add('timelog_type', 'Employee must clock in before clocking out.');
                }
            }
        });
    }

    public function messages(): array
    {
        return [
            'emp_id.required' => 'Employee ID is required.',
            'emp_id.exists' => 'The provided Employee ID does not exist.',
            'timelog_type.required' => 'Timelog type is required.',
            'timelog_type.in' => 'Timelog type must be either clock_in or clock_out.',
        ];
    }
}