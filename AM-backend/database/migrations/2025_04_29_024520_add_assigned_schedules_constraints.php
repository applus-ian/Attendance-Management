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
        Schema::table('assigned_schedules', function (Blueprint $table) {
            $table->foreign('emp_id')->references('emp_id')->on('employee')->onDelete('cascade');
            $table->foreign('sched_id')->references('sched_id')->on('schedules')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assigned_schedules', function (Blueprint $table) {
            $table->dropForeign(['emp_id']);
            $table->dropForeign(['sched_id']);
        });
    }
};
