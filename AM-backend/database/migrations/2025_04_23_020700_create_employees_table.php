<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->bigIncrements('emp_id');
            $table->unsignedBigInteger('dept_id')->nullable();
            $table->unsignedBigInteger('job_position_id')->nullable();
            $table->unsignedBigInteger('address_id')->nullable();
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('suffix')->nullable();
            $table->string('email')->unique();
            $table->string('gender');
            $table->date('dob');
            $table->string('civil_status');
            $table->string('nationality');
            $table->string('phone_number');
            $table->string('emergency_contact1');
            $table->string('emergency_contact2')->nullable();
            $table->date('date_hired');
            $table->string('status');
            $table->string('profile_pic_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
