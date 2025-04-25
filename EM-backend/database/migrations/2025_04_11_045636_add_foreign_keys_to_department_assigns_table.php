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
        Schema::table('department_assigns', function (Blueprint $table) {
            $table->foreign('parent_department_id')->references('id')->on('department_assigns')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('department_assigns', function (Blueprint $table) {
            $table->dropForeign(['parent_department_id']);
        });
    }
};
