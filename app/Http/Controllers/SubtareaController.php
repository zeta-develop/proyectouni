<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subtarea;
use App\Models\AsignacionSubtarea;
use App\Models\Tarea;
use App\Models\User;
use Inertia\Inertia;

class SubtareaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'tarea_id' => 'required|exists:tareas,id',
            'usuario_id' => 'required|exists:users,id',
        ]);

        $user = auth()->user();

        $subtarea = Subtarea::create([
            'titulo' => $request->titulo,
            'tarea_id' => $request->tarea_id,
            'creador_id' => $user->id,
        ]);

        // Asignar la subtarea al miembro seleccionado del grupo
        AsignacionSubtarea::create([
            'subtarea_id' => $subtarea->id,
            'usuario_id' => $request->usuario_id,
            'asignado_por' => $user->id,
        ]);

        return redirect()->back()->with('success', 'Subtarea creada y asignada correctamente.');
    }
}