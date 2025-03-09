<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsignacionTarea extends Model
{
    use HasFactory;

    protected $table = 'asignaciones_tarea';

    protected $fillable = [
        'tarea_id',
        'usuario_id',
        'asignado_por',
        'fecha_asignacion',
    ];

    public function tarea()
    {
        return $this->belongsTo(Tarea::class);
    }

    public function usuario()
    {
        return $this->belongsTo(User::class);
    }

    public function asignadoPor()
    {
        return $this->belongsTo(User::class, 'asignado_por');
    }
}