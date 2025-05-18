<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuditLogRequest extends FormRequest
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
            'user_id'     => 'required|exists:users,user_id',
            'id'     => 'required|exists:roles,id',
            'role'        => 'required|in:employee,admin,super_admin',
            'action_type' => 'required|in:Manual Request Approval,Manual Request Disapproval,Clock In,Clock Out,Create Schedule,Edit Schedule,Assign Schedule,Add Timelog,Account Configuration',
            'target_type' => 'required|string|max:50',
            'target_id'   => 'required|integer',
            'description' => 'required|string',
            'ip_address'  => 'nullable|ip',
        ];
    }
}
