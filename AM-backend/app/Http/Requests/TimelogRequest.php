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
        if ($this->isMethod('patch') || $this->isMethod('put')) {
            return [
                'comment' => ['sometimes', 'string', 'nullable', 'max:255'],
            ];
        }
        return [
            'emp_id' => ['required', 'exists:employees,emp_id'],
            'time' => ['required', 'date_format:H:i'],
            'timelog_type' => ['required', 'in:clock_in,clock_out,overtime'],
            'comment' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $empId = $this->input('emp_id');
            $timelogType = $this->input('timelog_type');

            if ($timelogType === 'clock_in') {
                $today = now()->toDateString();
                $openClockIn = Timelogs::where('emp_id', $empId)
                    ->whereDate('time', $today)
                    ->where('timelog_type', 'clock_in')
                    ->whereNotExists(function ($query) use ($empId, $today) {
                        $query->selectRaw('1')
                            ->from('timelogs as t2')
                            ->whereColumn('t2.emp_id', 'timelogs.emp_id')
                            ->whereDate('t2.time', $today)
                            ->where('t2.timelog_type', 'clock_out');
                    })
                    ->exists();
                if ($openClockIn) {
                    $validator->errors()->add('timelog_type', 'Employee is already clocked in for today.');
                }
            }

            if ($timelogType === 'clock_out') {
                $today = now()->toDateString();
                $openClockIn = Timelogs::where('emp_id', $empId)
                    ->whereDate('time', $today)
                    ->where('timelog_type', 'clock_in')
                    ->whereNotExists(function ($query) use ($empId, $today) {
                        $query->selectRaw('1')
                            ->from('timelogs as t2')
                            ->whereColumn('t2.emp_id', 'timelogs.emp_id')
                            ->whereDate('t2.time', $today)
                            ->where('t2.timelog_type', 'clock_out');
                    })
                    ->exists();
                if (!$openClockIn) {
                    $validator->errors()->add('timelog_type', 'Employee must clock in before clocking out today.');
                }
            }
        });
    }

    public function messages(): array
    {
        return [
            'emp_id.required' => 'Employee ID is required.',
            'emp_id.exists' => 'The provided Employee ID does not exist.',
            'time.required' => 'Time is required.',
            'time.date_format' => 'Time must be in the format HH:MM.',
            'comment.max' => 'Comment must be less than 255 characters.',
            'timelog_type.required' => 'Timelog type is required.',
            'timelog_type.in' => 'Timelog type must be either clock_in, clock_out, or overtime.',
        ];
    }
}
