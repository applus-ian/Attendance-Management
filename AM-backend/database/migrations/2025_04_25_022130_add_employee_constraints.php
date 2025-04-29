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
        Schema::table('employees', function (Blueprint $table) {
            $table->foreign('user_id')->references('user_id')->on('user')->onDelete('cascade');
            $table->foreign('dept_id')->references('dept_id')->on('department')->onDelete('cascade');
            $table->foreign('job_position_id')->references('job_position_id')->on('job_position')->onDelete('cascade');
            $table->foreign('address_id')->references('address_id')->on('employee_address')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['dept_id']);
            $table->dropForeign(['job_position_id']);
            $table->dropForeign(['address_id']);
        });
    }
};
