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
        Schema::table('job_vacancy', function (Blueprint $table) {
            $table->unsignedBigInteger('job_category')->nullable()->after('title');
            $table->foreign('job_category')->references('id')->on('job_category')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_vacancy', function (Blueprint $table) {
            //
        });
    }
};
