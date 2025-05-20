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
        Schema::create('holidays', function (Blueprint $table) {
            $table->id('holiday_id');
            $table->string('name');
            $table->date('date')->unique();
            $table->enum('type', [
                'Regular Holiday',
                'Special Non-working Holiday',
                'Special Working Holiday'
            ]);
            $table->boolean('movable')->default(false);
            $table->boolean('active')->default(true);
            $table->boolean('is_auto')->default(false);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('holidays');
    }
};
