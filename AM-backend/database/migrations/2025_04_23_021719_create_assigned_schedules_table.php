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
        Schema::create('assigned_schedules', function (Blueprint $table) {
            $table->id('assigned_id');
            $table->unsignedBigInteger('emp_id');
            $table->unsignedBigInteger('sched_id');
            $table->timestamp('assigned_at')->useCurrent();
            $table->timestamps(0);

            $table->foreign('emp_id')->references('emp_id')->on('employees')->onDelete('cascade');
            $table->foreign('sched_id')->references('sched_id')->on('schedules')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assigned_schedules');
    }
};
