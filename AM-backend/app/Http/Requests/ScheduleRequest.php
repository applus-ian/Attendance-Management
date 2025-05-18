<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ScheduleRequest extends FormRequest
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
            'title' => 'required|string|max:50',
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i|after:start',
            'day' => ['required', 'array', 'min:1'],
            'day.*' => ['in:monday,tuesday,wednesday,thursday,friday,saturday,sunday'],
        ];
    }
}
