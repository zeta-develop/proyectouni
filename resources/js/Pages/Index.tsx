import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/Components/ui/card";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";
import { CheckCircle, Clock, Users } from "lucide-react";

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Bienvenido a ProActiva
                    </h1>
                    <p className="text-muted-foreground">
                        Gestiona tus tareas y grupos de estudio de manera
                        eficiente
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                Tareas Grupales
                            </CardTitle>
                            <CardDescription>
                                Tareas asignadas a tus grupos
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2"
                                    >
                                        <div className="mt-0.5">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                Proyecto de Matemáticas {i}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Grupo: Matemáticas Avanzadas
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Vence: 15/06/2025
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                asChild
                                variant="outline"
                                className="w-full"
                            >
                                <Link href="/dashboard/grupos">
                                    Ver todos los grupos
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                Tareas Individuales
                            </CardTitle>
                            <CardDescription>
                                Tus tareas personales
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2"
                                    >
                                        <div className="mt-0.5">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                Ensayo de Literatura {i}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Vence: 10/06/2025
                                            </p>
                                            <div className="w-full h-2 bg-secondary rounded-full mt-1">
                                                <div
                                                    className="h-full bg-primary rounded-full"
                                                    style={{
                                                        width: `${i * 30}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                asChild
                                variant="outline"
                                className="w-full"
                            >
                                <Link href="/dashboard/tareas">
                                    Ver todas las tareas
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
