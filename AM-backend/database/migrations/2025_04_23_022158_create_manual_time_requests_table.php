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
        Schema::create('manual_time_requests', function (Blueprint $table) {
            $table->id('request_id');
            $table->unsignedBigInteger('emp_id');
            $table->enum('request_type', ['clock_in', 'clock_out', 'overtime']);
            $table->timestamp('request_time');
            $table->timestamp('request_end')->nullable();
            $table->text('reason');
            $table->enum('approval_status', ['pending', 'approved', 'rejected']);
            $table->unsignedBigInteger('reviewed_by')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps(0);

            $table->foreign('emp_id')->references('emp_id')->on('employees')->onDelete('cascade');
            $table->foreign('reviewed_by')->references('user_id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('manual_time_requests');
    }
};
