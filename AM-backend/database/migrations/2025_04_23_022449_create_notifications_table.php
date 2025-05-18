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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id('notif_id');
            $table->unsignedBigInteger('emp_id');
            $table->string('title');
            $table->string('notif_type');
            $table->text('message');
            $table->timestamp('read_at')->nullable();
            $table->boolean('is_seen')->default(false);
            $table->string('action_url')->nullable();
            $table->unsignedBigInteger('sender_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
