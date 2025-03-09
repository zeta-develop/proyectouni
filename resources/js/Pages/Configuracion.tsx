import { Bell, Clock, Plus } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { ThemeToggle } from "@/Components/theme-toggle";
import { Switch } from "@/Components/ui/switch";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/Components/ui/card";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function ConfiguracionPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Configuración
                    </h1>
                    <p className="text-muted-foreground">
                        Personaliza tu experiencia en ProActiva
                    </p>
                </div>

                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="p-4">
                            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                Apariencia
                            </CardTitle>
                            <CardDescription>
                                Personaliza la apariencia de la aplicación
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-4 pt-0">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <div className="space-y-0.5">
                                    <Label htmlFor="theme">Tema</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Cambia entre tema claro y oscuro
                                    </p>
                                </div>
                                <ThemeToggle />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="p-4">
                            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                <Bell className="h-5 w-5" />
                                Notificaciones
                            </CardTitle>
                            <CardDescription>
                                Configura tus preferencias de notificaciones
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-4 pt-0">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <div className="space-y-0.5">
                                    <Label htmlFor="email-notifications">
                                        Notificaciones por email
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Recibe notificaciones por correo
                                        electrónico
                                    </p>
                                </div>
                                <Switch id="email-notifications" />
                            </div>

                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <div className="space-y-0.5">
                                    <Label htmlFor="push-notifications">
                                        Notificaciones push
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Recibe notificaciones en tu navegador
                                    </p>
                                </div>
                                <Switch id="push-notifications" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader className="p-4">
                            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                <Clock className="h-5 w-5" />
                                Recordatorios
                            </CardTitle>
                            <CardDescription>
                                Configura recordatorios para tus tareas
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-4 pt-0">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <div className="space-y-0.5">
                                    <Label htmlFor="daily-reminder">
                                        Recordatorio diario
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Recibe un resumen diario de tus tareas
                                        pendientes
                                    </p>
                                </div>
                                <Switch id="daily-reminder" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <Label>Horas de recordatorio</Label>
                                    <Button variant="outline" size="sm">
                                        <Plus className="h-4 w-4 mr-1" />
                                        Añadir hora
                                    </Button>
                                </div>

                                <div className="rounded-md border">
                                    <div className="flex items-center justify-between p-3 sm:p-4">
                                        <div className="font-medium">
                                            9:00 AM
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            Eliminar
                                        </Button>
                                    </div>
                                    <div className="border-t" />
                                    <div className="flex items-center justify-between p-3 sm:p-4">
                                        <div className="font-medium">
                                            3:00 PM
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            Eliminar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}