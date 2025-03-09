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

        Schema::create('notificaciones', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('usuario_id')->nullable();
            $table->foreign('usuario_id')->references('id')->on('users');
            $table->text('tipo')->nullable();
            $table->text('contenido')->nullable();
            $table->timestampTz('fecha_creacion')->nullable()->useCurrent();
            $table->timestampTz('fecha_lectura')->nullable();
            $table->bigInteger('entidad_id')->nullable();
            $table->text('entidad_tipo')->nullable();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notificaciones');
    }
};
