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

        Schema::create('tareas', function (Blueprint $table) {
            $table->id();
            $table->text('titulo');
            $table->text('descripcion')->nullable();
            $table->timestampTz('fecha_creacion')->nullable()->useCurrent();
            $table->timestampTz('fecha_entrega')->nullable();
            $table->bigInteger('grupo_id')->nullable();
            $table->foreign('grupo_id')->references('id')->on('grupos');
            $table->bigInteger('creador_id')->nullable();
            $table->foreign('creador_id')->references('id')->on('users');
            $table->text('estado')->nullable();
            $table->integer('progreso')->nullable();
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tareas');
    }
};
