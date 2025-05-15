<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function getAll()
    {
        return User::with(['employee', 'roles'])->get();
    }

    public function create(array $data)
    {
        return User::create($data);
    }

    public function getById($id)
    {
        return User::with(['employee', 'roles'])->findOrFail($id);
    }

    public function update($id, array $data)
    {
        $user = User::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return $user;
    }
}
