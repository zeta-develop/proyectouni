<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\SubtareaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Index');
    })->name('index');

    Route::get('/grupos', [GrupoController::class, 'index'])->name('grupos');
    Route::post('/grupos', [GrupoController::class, 'store']);
    Route::post('/grupos/join', [GrupoController::class, 'join'])->name('grupos.join');
    Route::post('/grupos/leave/{id}', [GrupoController::class, 'leave'])->name('grupos.leave');

    Route::get('/tareas', [TareaController::class, 'index'])->name('tareas');
    Route::post('/tareas', [TareaController::class, 'store']);
    Route::post('/subtareas', [SubtareaController::class, 'store'])->name('subtareas.store');

    Route::get('/configuracion', function () {
        return Inertia::render('Configuracion');
    })->name('configuracion');
    Route::get('/chat', function () {
        return Inertia::render('Chat');
    })->name('chat');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['verified'])->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
