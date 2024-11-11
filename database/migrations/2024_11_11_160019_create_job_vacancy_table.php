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
        Schema::create('job_vacancy', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->string('title', length: 100);
            $table->string('description',length: 255)->nullable();
            $table->string('requirement',length: 500)->nullable();
            $table->string('location',length: 500)->nullable();
            $table->string('files',length: 1000)->nullable();
            $table->string('company_name',length: 100)->nullable();
            $table->string('company_logo',length: 255)->nullable();
            $table->date('closing_date')->nullable();
            $table->string('contact_phone',length: 20)->nullable();
            $table->string('contact_email',length: 100)->nullable();          
            $table->string('address',length: 255)->nullable();      
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
        Schema::dropIfExists('job_vacancy');
    }
};
