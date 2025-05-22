<?php

use App\Enums\CivilStatus;
use App\Enums\Gender;
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
            $table->enum('gender', array_column(Gender::cases(), 'value'))->nullable();
            $table->date('birthdate');
            $table->enum('civil_status', array_column( CivilStatus::cases(), 'value'));
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
            $table->unsignedBigInteger('employment_type_id');
            $table->unsignedBigInteger('manager_id')->nullable();
            $table->string('profile_pic_url')->nullable();
            $table->string('tin_number')->nullable();
            $table->string('sss_number')->nullable();
            $table->string('pagibig_number')->nullable();
            $table->string('philhealth_number')->nullable();
            $table->string('bank_number')->nullable();

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
