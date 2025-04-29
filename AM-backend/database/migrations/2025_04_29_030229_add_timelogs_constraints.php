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
        Schema::table('timelogs', function (Blueprint $table) {
            $table->foreign('emp_id')->references('emp_id')->on('employee')->onDelete('cascade');
            $table->foreign('created_by')->references('user_id')->on('user')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('timelogs', function (Blueprint $table) {
            $table->dropForeign(['emp_id']);
            $table->dropForeign(['created_by']);
        });
    }
};
