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
            $table->id('timelog_id');
            $table->unsignedBigInteger('emp_id');
            $table->string('timelog_type');
            $table->timestamp('time');
            $table->string('created_by');
            $table->boolean('is_present')->default(false);
            $table->boolean('is_absent')->default(false);
            $table->boolean('is_late')->default(false);
            $table->decimal('hrs_worked', 5, 2);
            $table->decimal('overtime_hrs', 5, 2);
            $table->timestamps();
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
