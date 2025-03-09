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
        Schema::disableForeignKeyConstraints();

        Schema::create('archivos', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('subtarea_id')->nullable();
            $table->foreign('subtarea_id')->references('id')->on('subtareas');
            $table->bigInteger('usuario_id')->nullable();
            $table->foreign('usuario_id')->references('id')->on('users');
            $table->text('nombre');
            $table->text('tipo')->nullable();
            $table->text('extension')->nullable();
            $table->text('url');
            $table->bigInteger('tama\0f1o')->nullable();
            $table->timestampTz('fecha_subida')->nullable()->useCurrent();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('archivos');
    }
};
