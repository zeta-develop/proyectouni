<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsignacionSubtarea extends Model
{
    use HasFactory;

    protected $table = 'asignaciones_subtarea';

    protected $fillable = [
        'subtarea_id',
        'usuario_id',
        'asignado_por',
        'fecha_asignacion',
    ];

    public function subtarea()
    {
        return $this->belongsTo(Subtarea::class);
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