<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id('log_id');
            $table->unsignedBigInteger('user_id');
            $table->enum('role', ['employee', 'admin', 'super_admin']);
            $table->enum('action_type', [
                'View All Users',
                'View User',
                'Set Active User',
                'Set Inactive User',
                'Delete a User',
                'View timelogs',
                'View a timelog',
                'Clock In',
                'Clock Out',
                'View Schedules',
                'Create Schedule',
                'View Schedule',
                'Edit Schedule',
                'Delete Schedule',
                'View All Request',
                'Submit Request',
                'View Specific Request',
                'Manual Request Approval',
                'Manual Request Disapproval',
                'View All Assigned Schedules',
                'Assigned Schedule',
                'Update Assigned Schedule',
                'Remove Assigned Schedule'
            ]);
            $table->string('target_type', 50)->nullable();
            $table->unsignedBigInteger('target_id')->nullable();
            $table->text('description');
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
