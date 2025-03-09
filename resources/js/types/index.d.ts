import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface MiembroGrupo {
    id: number;
    name: string;
    pivot: {
        rol: string;
    };
}

export interface Grupo {
    id: number;
    nombre: string;
    codigo: string;
    miembros: MiembroGrupo[];
}

export interface Asignacion {
    id: number;
    usuario: User;
}

export interface AsignacionSubtarea {
    id: number;
    usuario: User;
}

export interface Subtarea {
    completada: any;
    id: number;
    titulo: string;
    fecha_creacion: string;
    creador_id: number;
    asignaciones: AsignacionSubtarea[];
}

export interface Tarea {
    id: number;
    titulo: string;
    descripcion?: string;
    fecha_creacion: string;
    fecha_entrega?: string;
    grupo?: Grupo;
    creador_id: number;
    estado?: string;
    progreso?: number;
    asignaciones: Asignacion[];
    subtareas: Subtarea[];
}

export interface PageProps {
    grupos: Grupo[];
    tareas: Tarea[];
}

export interface NewGroup {
    nombre: string;
    codigo: string;
    [key: string]: string | number | boolean | File;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
