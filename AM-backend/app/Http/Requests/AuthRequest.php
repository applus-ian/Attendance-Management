<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Email is required.',
            'password.required' => 'Password is required.',
            'email.exists' => "Account doesn't exist!",
        ];
    }
}
