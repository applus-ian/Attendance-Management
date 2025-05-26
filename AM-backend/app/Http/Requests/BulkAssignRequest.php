<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkAssignRequest extends FormRequest
{
    public function authorize()
    {
        // You can add more complex logic here if needed
        return auth()->check();
    }

    public function rules()
    {
        return [
            'sched_id' => 'required|integer|exists:schedules,sched_id',
            'emp_ids' => 'required|array|min:1',
            'emp_ids.*' => 'integer|exists:employees,emp_id',
            'assigned_at' => 'nullable|date',
        ];
    }
}
