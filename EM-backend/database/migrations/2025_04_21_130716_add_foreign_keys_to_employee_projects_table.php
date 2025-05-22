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
        Schema::table('employee_projects', function (Blueprint $table) {
            $table->foreign('project_role_id')->references('id')->on('project_roles')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employee_projects', function (Blueprint $table) {
            $table->dropForeign(['project_role_id']);
        });
    }
};
