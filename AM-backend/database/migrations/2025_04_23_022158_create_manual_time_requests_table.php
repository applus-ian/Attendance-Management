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
            $table->timestamp('time');
            $table->string('reason', 255);
            $table->enum('approval_status', ['pending', 'approved', 'rejected']);
            $table->string('reviewed_by', 50)->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
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
