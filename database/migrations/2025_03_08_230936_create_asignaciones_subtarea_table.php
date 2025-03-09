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

        Schema::create('asignaciones_subtarea', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('subtarea_id')->nullable();
            $table->foreign('subtarea_id')->references('id')->on('subtareas');
            $table->bigInteger('usuario_id')->nullable();
            $table->foreign('usuario_id')->references('id')->on('users');
            $table->bigInteger('asignado_por')->nullable();
            $table->foreign('asignado_por')->references('id')->on('users');
            $table->timestampTz('fecha_asignacion')->nullable()->useCurrent();
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asignaciones_subtarea');
    }
};
