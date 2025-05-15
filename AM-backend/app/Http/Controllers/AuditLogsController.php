<?php

namespace App\Http\Controllers;

use App\Models\AuditLogs;
use App\Http\Requests\AuditLogRequest;
use App\Http\Resources\AuditLogResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class AuditLogsController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $this->authorize('viewAny', AuditLogs::class);
        return AuditLogResource::collection(AuditLogs::latest()->paginate(15));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AuditLogRequest $request)
    {
        $this->authorize('create', AuditLogs::class);
        $log = AuditLogs::create($request->validated());
        return new AuditLogResource($log);
    }

    /**
     * Display the specified resource.
     */
    public function show(AuditLogs $auditLog)
    {
        $this->authorize('view', $auditLog);
        return new AuditLogResource($auditLog);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AuditLogs $auditLog)
    {
        $this->authorize('delete', $auditLog);
        $auditLog->delete();

        return response()->json(['message' => 'Deleted successfully.']);
    }
}
