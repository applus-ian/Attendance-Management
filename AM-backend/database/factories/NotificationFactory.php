<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Notifications;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notifications>
 */
class NotificationFactory extends Factory
{
    protected $model = Notifications::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'notif_type' => $this->faker->word,
            'message' => $this->faker->paragraph,
            'is_seen' => $this->faker->boolean,
            'action_url' => $this->faker->url,
            'sender_id' => Employee::factory(),
        ];
    }
}
