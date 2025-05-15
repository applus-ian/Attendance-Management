<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notifications;
use App\Services\NotificationsService;
use App\Http\Requests\NotificationRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class NotificationsController extends Controller
{
    use AuthorizesRequests;

    protected $notificationsService;

    public function __construct(NotificationsService $notificationsService)
    {
        $this->notificationsService = $notificationsService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Notifications::class);
        $notifications = $this->notificationsService->getAll();
        return response()->json($notifications);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(NotificationRequest $request)
    {
        $this->authorize('create', Notifications::class);
        $notification = $this->notificationsService->create($request->validated());
        return response()->json($notification, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Notifications $notifications)
    {
        $this->authorize('view', $notifications);
        return response()->json($notifications);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Notifications $notifications)
    {
        $this->authorize('update', $notifications);
        $validatedData = $request->validate([
            'emp_id' => 'required|exists:employees,emp_id',
            'notif_type' => 'required|string|max:255',
            'notif_status' => 'required|string|max:255',
            'created_at' => 'required|date',
        ]);

        $updatedNotification = $this->notificationsService->update($notifications, $validatedData);
        return response()->json($updatedNotification);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notifications $notifications)
    {
        $this->authorize('delete', $notifications);
        $this->notificationsService->delete($notifications);
        return response()->json(['message' => 'Notification deleted']);
    }
}
