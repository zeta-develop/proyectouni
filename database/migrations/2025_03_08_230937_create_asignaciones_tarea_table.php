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

        Schema::create('asignaciones_tarea', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('tarea_id')->unsigned();
            $table->bigInteger('usuario_id')->unsigned();
            $table->bigInteger('asignado_por')->unsigned();
            $table->timestampTz('fecha_asignacion')->nullable()->useCurrent();
            $table->timestamps(); // Agregar columnas created_at y updated_at

            $table->foreign('tarea_id')->references('id')->on('tareas')->onDelete('cascade');
            $table->foreign('usuario_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('asignado_por')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asignaciones_tarea');
    }
};
