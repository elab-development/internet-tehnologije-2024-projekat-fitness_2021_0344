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
        Schema::table('planovi_vezbi', function (Blueprint $table) {
             $table->foreignId('plan_treninga_id')
                  ->after('vezba_id')              
                  ->constrained('planovi_treninga')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('planovi_vezbi', function (Blueprint $table) {
            $table->dropForeign(['plan_treninga_id']);
            $table->dropColumn('plan_treninga_id');
        });
    }
};
