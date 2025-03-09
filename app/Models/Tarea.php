<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    use HasFactory;

    protected $table = 'tareas';

    protected $fillable = [
        'titulo',
        'descripcion',
        'fecha_entrega',
        'grupo_id',
        'creador_id',
        'estado',
        'progreso',
    ];

    public function grupo()
    {
        return $this->belongsTo(Grupo::class);
    }

    public function creador()
    {
        return $this->belongsTo(User::class, 'creador_id');
    }

    public function asignaciones()
    {
        return $this->hasMany(AsignacionTarea::class, 'tarea_id');
    }

    public function subtareas()
    {
        return $this->hasMany(Subtarea::class, 'tarea_id');
    }
}