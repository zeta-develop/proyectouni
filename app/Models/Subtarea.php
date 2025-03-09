<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subtarea extends Model
{
    use HasFactory;

    protected $table = 'subtareas';

    protected $fillable = [
        'titulo',
        'tarea_id',
        'creador_id',
    ];

    public function tarea()
    {
        return $this->belongsTo(Tarea::class);
    }

    public function creador()
    {
        return $this->belongsTo(User::class, 'creador_id');
    }

    public function asignaciones()
    {
        return $this->hasMany(AsignacionSubtarea::class, 'subtarea_id');
    }
}