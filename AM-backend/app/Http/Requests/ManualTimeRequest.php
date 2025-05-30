<?php

namespace App\Http\Requests;

use App\Models\ManualTimeRequests;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Http\FormRequest;

class ManualTimeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('create', ManualTimeRequests::class);
    }

    public function rules(): array
    {
        return [
            'request_type' => 'required|in:clock_in,clock_out,overtime',
            'time' => 'required|date',
            'reason' => 'required|string|max:255',
        ];
    }
}
