<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->foreign('dept_id')->references('dept_id')->on('departments')->onDelete('restrict');
            $table->foreign('job_position_id')->references('job_position_id')->on('job_positions')->onDelete('restrict');
            $table->foreign('address_id')->references('address_id')->on('employee_addresses')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropForeign(['dept_id']);
            $table->dropForeign(['job_position_id']);
            $table->dropForeign(['address_id']);
        });
    }
};
