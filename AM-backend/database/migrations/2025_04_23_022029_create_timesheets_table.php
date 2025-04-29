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
            $table->decimal('total_hrs_work', 5, 2);
            $table->decimal('break_duration', 5, 2);
            $table->decimal('overtime_hrs', 5, 2)->nullable();
            $table->integer('total_lates');
            $table->unsignedBigInteger('approved_by')->nullable();
            $table->timestamps();
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
