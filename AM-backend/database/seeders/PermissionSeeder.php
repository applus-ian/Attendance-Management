<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::factory()->create([
            'name' => 'create_timelog'
        ]);
        Permission::factory()->create([
            'name' => 'view_all_request'
        ]);
        Permission::factory()->create([
            'name' => 'view_request'
        ]);
        Permission::factory()->create([
            'name' => 'create_request'
        ]);
        Permission::factory()->create([
            'name' => 'approve_request'
        ]);
        Permission::factory()->create([
            'name' => 'reject_request'
        ]);
        Permission::factory()->create([
            'name' => 'update_schedule'
        ]);
    }
}
