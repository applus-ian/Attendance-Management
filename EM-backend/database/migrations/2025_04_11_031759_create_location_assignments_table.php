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
        Schema::create('location_assignments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_position_id');
            $table->unsignedBigInteger('country_assign_id')->nullable();
            $table->unsignedBigInteger('office_assign_id')->nullable();
            $table->unsignedBigInteger('team_assign_id')->nullable();
            $table->unsignedBigInteger('department_assign_id')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location_assignments');
    }
};
