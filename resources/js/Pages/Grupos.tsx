import { useState } from "react";

import { Plus, Users, MoreVertical } from "lucide-react";
import { CreateGroupDialog } from "@/Components/create-group-dialog";
import { JoinGroupDialog } from "@/Components/join-group-dialog";
import { router, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Grupo, NewGroup, Tarea } from "@/types";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";

export default function GruposPage() {
    const { grupos, tareas } = usePage<{ grupos: Grupo[]; newGroup: NewGroup; tareas: Tarea[] }>().props;
    const [openCreateGroup, setOpenCreateGroup] = useState(false);
    const [openJoinGroup, setOpenJoinGroup] = useState(false);

    const handleCreateGroup = (newGroup: NewGroup) => {
        router.post("/grupos", newGroup, {
            onSuccess: () => setOpenCreateGroup(false),
        });
    };

    const handleLeaveGroup = (grupoId: number) => {
        router.post(
            `/grupos/leave/${grupoId}`,
            {},
            {
                onSuccess: () => {
                    // Optionally, you can refresh the page or update the state to reflect the changes
                },
            }
        );
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                            Grupos
                        </h1>
                        <p className="text-muted-foreground">
                            Gestiona tus grupos de estudio
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={() => setOpenJoinGroup(true)}
                        >
                            Unirse a grupo
                        </Button>
                        <Button
                            className="w-full sm:w-auto"
                            onClick={() => setOpenCreateGroup(true)}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Crear grupo
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {grupos.map((grupo: Grupo) => (
                        <Card key={grupo.id}>
                            <CardHeader className="pb-2 p-4">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg sm:text-xl">
                                        {grupo.nombre}
                                    </CardTitle>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Opciones
                                                </span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                Editar grupo
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Invitar miembros
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleLeaveGroup(grupo.id)
                                                }
                                            >
                                                Salir del grupo
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Código: {grupo.codigo}
                                </p>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            {grupo.miembros
                                                ? grupo.miembros.length
                                                : 0}{" "}
                                            miembros
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Button variant="outline" className="w-full">
                                    Entrar al grupo
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <CreateGroupDialog
                    open={openCreateGroup}
                    onOpenChange={setOpenCreateGroup}
                    onCreate={handleCreateGroup}
                />
                <JoinGroupDialog
                    open={openJoinGroup}
                    onOpenChange={setOpenJoinGroup}
                />
            </div>
        </DashboardLayout>
    );
}
