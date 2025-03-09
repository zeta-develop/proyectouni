<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grupo;
use Inertia\Inertia;

class GrupoController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $grupos = $user->grupos()->with('miembros')->get(); // Cargar la relación miembros

        return Inertia::render('Grupos', [
            'grupos' => $grupos,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'codigo' => 'required|string|unique:grupos,codigo',
        ]);

        $grupo = Grupo::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'codigo' => $request->codigo,
            'creador_id' => auth()->id(),
        ]);

        // Attach the creator to the group with the role of 'creador'
        $grupo->miembros()->attach(auth()->id(), ['rol' => 'creador']);

        return redirect()->route('grupos');
    }

    public function join(Request $request)
    {
        $request->validate([
            'codigo' => 'required|string|exists:grupos,codigo',
        ]);

        $grupo = Grupo::where('codigo', $request->codigo)->firstOrFail();
        $user = auth()->user();

        // Attach the user to the group with the role of 'usuario'
        $user->grupos()->attach($grupo->id, ['rol' => 'usuario']);

        return redirect()->route('grupos');
    }

    public function leave(Request $request, $id)
    {
        $grupo = Grupo::findOrFail($id);
        $user = auth()->user();

        // Detach the user from the group
        $user->grupos()->detach($grupo->id);

        return redirect()->route('grupos');
    }
}