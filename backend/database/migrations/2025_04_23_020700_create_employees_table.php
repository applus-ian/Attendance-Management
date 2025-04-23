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
        Schema::create('employees', function (Blueprint $table) {
            $table->id('emp_id');
            $table->string('first_name', 100);
            $table->string('middle_name', 100)->nullable();
            $table->string('last_name', 100);
            $table->enum('gender', ['male', 'female', 'other']);
            $table->string('civil_status', 50)->nullable();
            $table->string('email', 100)->unique();
            $table->string('phone_number', 20)->nullable();
            $table->date('dob')->nullable();
            $table->unsignedBigInteger('dept_id');
            $table->string('position', 100)->nullable();
            $table->enum('status', ['active', 'inactive']);
            $table->date('date_hired')->nullable();
            $table->string('address_line1', 255)->nullable();
            $table->string('address_line2', 255)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('country', 100)->nullable();
            $table->string('postal_code', 20)->nullable();
            $table->timestamps(0);

            $table->foreign('dept_id')->references('dept_id')->on('departments')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
