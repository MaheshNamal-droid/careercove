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
            $table->unsignedBigInteger('view_count')->default(0)->after('status');
            //Set the default value of the view_count column to 0
            //Place the view_count column after the status column in the table
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_vacancy', function (Blueprint $table) {
            $table->dropColumn('view_count');
        });
    }
};
