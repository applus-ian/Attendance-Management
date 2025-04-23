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
        Schema::create('timesheets', function (Blueprint $table) {
            $table->id('timesheet_id');
            $table->unsignedBigInteger('emp_id');
            $table->date('date');
            $table->time('total_work_hrs')->nullable();
            $table->time('break_duration')->nullable();
            $table->time('overtime_hrs')->nullable();
            $table->integer('total_lates')->default(0);
            $table->unsignedBigInteger('approved_by')->nullable();
            $table->timestamps(0);

            $table->foreign('emp_id')->references('emp_id')->on('employees')->onDelete('cascade');
            $table->foreign('approved_by')->references('user_id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timesheets');
    }
};
