<?php

namespace App\Http\Controllers;

use App\Models\Timesheets;
use Illuminate\Http\Request;
use App\Services\AuditLogsService;
use App\Http\Resources\TimesheetResource;
use App\Services\TimesheetService;

class TimesheetsController extends Controller
{


    public function __construct(protected AuditLogsService $auditLogsService, protected TimesheetService $timesheetService)
    {
        $this->auditLogsService = $auditLogsService;
        $this->timesheetService = $timesheetService;
    }

    public function index()
    {
        $this->authorize('viewAny', Timesheets::class);

        $this->auditLogsService->log(
            action: 'View All Timesheets',
            type: 'Timesheets',
            targetId: null,
            description: "View all Timesheets."
        );

        return TimesheetResource::collection(Timesheets::with('timelogs')->get());
    }

    public function store(Request $request)
    {
        $timesheet = $this->timesheetService->store($request->validated());

        $this->auditLogsService->log(
            action: 'Create Timesheet',
            type: 'Timesheet',
            targetId: $request->timesheet_id,
            description: "Create a Timesheet"
        );

        return new TimesheetResource($timesheet);
    }

    public function show(Request $request)
    {
        $user = $request->user();

        $empId = $user->employee->emp_id ?? $user->emp_id ?? $user->id;

        $timesheets = Timesheets::where('emp_id', $empId)->with('timelogs')->get();
        
        foreach ($timesheets as $timesheet) {
            $this->authorize('view', $timesheet);
        }

        $this->auditLogsService->log(
            action: 'View Own Timesheet',
            type: 'Timesheets',
            targetId: $user->timesheet_id,
            description: "View Own Timesheets."
        );

        return TimesheetResource::collection($timesheets);
    }
}
