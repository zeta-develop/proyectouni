<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tarea;
use App\Models\Grupo;
use App\Models\User;
use App\Models\AsignacionTarea;
use Inertia\Inertia;

class TareaController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Tareas asignadas al usuario
        $tareasAsignadas = Tarea::whereHas('asignaciones', function ($query) use ($user) {
            $query->where('usuario_id', $user->id);
        })->with('grupo.miembros', 'asignaciones.usuario', 'subtareas.asignaciones.usuario')->get();

        // Tareas individuales creadas por el usuario
        $tareasIndividuales = Tarea::where('creador_id', $user->id)
            ->doesntHave('grupo')
            ->with('asignaciones.usuario', 'subtareas.asignaciones.usuario')
            ->get();

        // Combinar tareas asignadas e individuales
        $tareasAsignadas = $tareasAsignadas->merge($tareasIndividuales);

        // Tareas grupales
        $tareasGrupales = Tarea::whereHas('grupo', function ($query) use ($user) {
            $query->whereHas('miembros', function ($query) use ($user) {
                $query->where('users.id', $user->id);
            });
        })->with('grupo.miembros', 'asignaciones.usuario', 'subtareas.asignaciones.usuario')->get();

        // Grupos en los que el usuario es creador
        $gruposCreados = Grupo::where('creador_id', $user->id)->get();

        return Inertia::render('Tareas', [
            'tareasAsignadas' => $tareasAsignadas,
            'tareasGrupales' => $tareasGrupales,
            'tareasIndividuales' => $tareasIndividuales,
            'gruposCreados' => $gruposCreados,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'fecha_entrega' => 'nullable|date',
            'grupo_id' => 'nullable|exists:grupos,id',
        ]);

        $grupo = Grupo::find($request->grupo_id);
        $user = auth()->user();

        // Verificar si el usuario es el creador del grupo
        if ($grupo && $grupo->creador_id !== $user->id) {
            return redirect()->back()->withErrors(['error' => 'No tienes permiso para crear tareas en este grupo.']);
        }

        $tarea = Tarea::create([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'fecha_entrega' => $request->fecha_entrega,
            'grupo_id' => $request->grupo_id,
            'creador_id' => $user->id,
            'estado' => 'pendiente',
            'progreso' => 0,
        ]);

        // Asignar la tarea a todos los miembros del grupo
        if ($grupo) {
            foreach ($grupo->miembros as $miembro) {
                AsignacionTarea::create([
                    'tarea_id' => $tarea->id,
                    'usuario_id' => $miembro->id,
                    'asignado_por' => $user->id,
                ]);
            }
        }

        return redirect()->route('tareas');
    }
}