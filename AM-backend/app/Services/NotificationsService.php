<?php

namespace App\Services;

use App\Models\Notifications;

class NotificationsService
{
    public function getAll()
    {
        return Notifications::all();
    }

    public function create(array $data)
    {
        return Notifications::create($data);
    }

    public function update(Notifications $notifications, array $data)
    {
        $notifications->update($data);
        return $notifications;
    }

    public function delete(Notifications $notifications)
    {
        $notifications->delete();
    }
}
