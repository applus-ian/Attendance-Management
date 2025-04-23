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
                'Manual Request Approval',
                'Manual Request Disapproval',
                'Clock In',
                'Clock Out',
                'Create Schedule',
                'Edit Schedule',
                'Assign Schedule',
                'Add Timelog',
                'Account Configuration'
            ]);
            $table->string('target_type', 50);
            $table->unsignedBigInteger('target_id');
            $table->text('description');
            $table->string('ip_address', 45)->nullable();
            $table->string('device', 100)->nullable();
            $table->timestamps(0);

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
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
