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
        Schema::create('schedules', function (Blueprint $table) {
            $table->id('sched_id');
            $table->time('sched_start');
            $table->time('sched_end');
            $table->time('sched_break');
            $table->enum('day', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'everyday']);
            $table->integer('num_assigned')->default(0);
            $table->timestamps(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
