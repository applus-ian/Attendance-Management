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
                'View All Request',
                'View Request',
                'Submit Request',
                'Manual Request Approval',
                'Manual Request Disapproval',
                'Clock In',
                'Clock Out',
                'Create Schedule',
                'Edit Schedule',
                'Assign Schedule',
                'Delete Schedule',
                'Add Timelog',
                'Account Configuration'
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
