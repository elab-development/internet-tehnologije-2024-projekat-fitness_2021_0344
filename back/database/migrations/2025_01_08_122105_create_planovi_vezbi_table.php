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
        Schema::create('planovi_vezbi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vezba_id')->constrained('vezbe')->onDelete('cascade');
            $table->integer('broj_serija');
            $table->integer('broj_ponavljanja');
            $table->date('datum');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planovi_vezbi');
    }
};
