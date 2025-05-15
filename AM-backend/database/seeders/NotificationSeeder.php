<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notifications;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        Notifications::factory()->count(1)->create();
    }
}
