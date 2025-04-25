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
        Schema::create('timelogs', function (Blueprint $table) {
            $table->id('log_id');
            $table->unsignedBigInteger('emp_id');
            $table->enum('log_type', ['clock_in', 'clock_out']);
            $table->timestamp('log_time');
            $table->unsignedBigInteger('created_by');
            $table->boolean('is_absent')->default(false);
            $table->timestamps(0);

            $table->foreign('emp_id')->references('emp_id')->on('employees')->onDelete('cascade');
            $table->foreign('created_by')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timelogs');
    }
};
