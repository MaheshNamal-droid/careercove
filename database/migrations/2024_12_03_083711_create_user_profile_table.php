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
        Schema::create('user_profile', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->string('first_name',length: 100)->nullable();
            $table->string('last_name',length: 100)->nullable();
            $table->string('email',length: 100)->nullable();
            $table->string('address',length: 255)->nullable();    
            $table->string('contact_phone',length: 20)->nullable();
            $table->string('social_media',length: 500)->nullable();
            $table->string('profile_picture',length: 1000)->nullable();
            $table->string('resume',length: 1000)->nullable();
            $table->string('description',length: 255)->nullable();
            $table->integer('status')->default(1);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profile');
    }
};
