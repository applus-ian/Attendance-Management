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
        Schema::table('manual_time_requests', function (Blueprint $table) {
            $table->foreign('emp_id')->references('emp_id')->on('employees')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('manual_time_requests', function (Blueprint $table) {
            $table->dropForeign(['emp_id']);
            $table->dropForeign(['reviewed_by']);
        });
    }
};
