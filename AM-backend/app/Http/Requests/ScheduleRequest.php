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

            // 'day' can be either "everyday" (string) or array of days
            'day' => ['required', function ($attribute, $value, $fail) {
                $allowed = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];

                if ($value === 'everyday') {
                    return; // valid
                }

                if (!is_array($value)) {
                    return $fail("The {$attribute} must be an array or the string 'everyday'.");
                }

                if (count($value) < 1) {
                    return $fail("The {$attribute} must have at least one day selected.");
                }

                foreach ($value as $day) {
                    if (!in_array(strtolower($day), $allowed)) {
                        return $fail("The day '{$day}' is not valid. Allowed values are: " . implode(', ', $allowed) . ".");
                    }
                }
            }],
        ];
    }

    /**
     * Modify input before validation (optional)
     */
    protected function prepareForValidation()
    {
        if (is_array($this->day)) {
            // Normalize all days to lowercase before validation
            $this->merge([
                'day' => array_map('strtolower', $this->day),
            ]);
        } elseif (is_string($this->day)) {
            // Normalize string input (e.g., "EVERYDAY" -> "everyday")
            $this->merge([
                'day' => strtolower($this->day),
            ]);
        }
    }
}
