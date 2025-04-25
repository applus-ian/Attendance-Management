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
            $table->id();
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('suffix')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->date('birthdate');
            $table->enum('civil_status', [
                'single',
                'married',
                'widowed',
                'divorced',
                'separated',
                'anulled',
                // 'cohabiting', should we add cohabiting/live-in?
            ]);
            $table->string('nationality');
            $table->string('region');
            $table->string('province');
            $table->string('city_or_municipality');
            $table->string('barangay');
            $table->string('street');
            $table->string('phone_number')->unique();
            $table->string('emergency_contact1');
            $table->string('emergency_contact2');
            $table->string('email')->unique();
            $table->unsignedBigInteger('job_position_id');
            $table->date('date_hired');
            $table->enum('employment_type', [
                'fulltime',
                'parttime',
                'contractual',
                // what other employment type
            ]);
            $table->unsignedBigInteger('manager_id');
            $table->string('profile_pic_url')->nullable();

            $table->softDeletes();
            $table->timestamps();
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
