<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class PasswordChangeRequest extends FormRequest
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
            'current_password' => ['required', 'string', function ($attribute, $value, $fail) {
                $user = Auth::user();
                if (!$user || !Hash::check($value, $user->password)) {
                    $fail('The current password is incorrect.');
                }
            }],
            'new_password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }

    /**
     * Get custom error messages for the request.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'current_password.required' => 'The current password is required.',
            'new_password.required' => 'The new password is required.',
            'new_password.min' => 'The new password must be at least 8 characters long.',
            'new_password.confirmed' => 'The new password confirmation does not match.',
        ];
    }
}
