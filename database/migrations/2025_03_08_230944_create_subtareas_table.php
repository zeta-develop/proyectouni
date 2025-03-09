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

        Schema::create('subtareas', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('tarea_id')->nullable();
            $table->foreign('tarea_id')->references('id')->on('tareas');
            $table->text('titulo');
            $table->timestampTz('fecha_creacion')->nullable()->useCurrent();
            $table->bigInteger('creador_id')->nullable();
            $table->foreign('creador_id')->references('id')->on('users');
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subtareas');
    }
};
