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
            $table->decimal('total_hrs_work', 5, 2);
            $table->decimal('total_overtime_hrs', 5, 2)->nullable();
            $table->integer('total_lates');
            $table->integer('total_absent');
            $table->integer('total_present');
            $table->decimal('scheduled_hrs');
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
