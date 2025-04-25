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
        Schema::table('location_assignments', function (Blueprint $table) {
            $table->foreign('job_position_id')->references('id')->on('job_positions')->onDelete('cascade');
            $table->foreign('country_assign_id')->references('id')->on('country_assigns')->onDelete('cascade');
            $table->foreign('office_assign_id')->references('id')->on('office_assigns')->onDelete('cascade');
            $table->foreign('team_assign_id')->references('id')->on('team_assigns')->onDelete('cascade');
            $table->foreign('department_assign_id')->references('id')->on('department_assigns')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('location_assignments', function (Blueprint $table) {
            $table->dropForeign(['job_position_id']);
            $table->dropForeign(['country_assign_id']);
            $table->dropForeign(['office_assign_id']);
            $table->dropForeign(['team_assign_id']);
            $table->dropForeign(['department_assign_id']);
        });
    }
};
