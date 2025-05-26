<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssignedSchedulesRequest extends FormRequest
{
    public function authorize(): bool
    {
        // You can put logic here or keep it true if authorization is handled elsewhere (e.g., in controller policies)
        return true;
    }

    public function rules(): array
    {
        return [
            'emp_id' => 'required|exists:employees,emp_id',
            'sched_id' => 'required|exists:schedules,sched_id',
            'assigned_at' => 'nullable|date|after_or_equal:today',
        ];
    }
}
