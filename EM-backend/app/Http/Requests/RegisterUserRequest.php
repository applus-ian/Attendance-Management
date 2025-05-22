<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterUserRequest extends FormRequest
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
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => [
                'required',
                'string',
                'min:8',  // Minimum length of 8 characters
                Password::min(8)->letters()->numbers()->symbols(),  // Capital letter, number, special char
                'confirmed', // Password confirmation field
            ],
            'password_confirmation' => ['required', 'string', 'min:8'],
        ];
    }

    /**
     * Custom messages for validation errors.
     */
    public function messages()
    {
        return [
            'password.confirmed' => 'The password confirmation does not match.',
            // Add other custom messages if needed
        ];
    }
}

