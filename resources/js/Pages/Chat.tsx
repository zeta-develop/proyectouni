import { Send, Paperclip } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function ChatPage() {
    const mensajes = [
        {
            id: 1,
            remitente: "Juan Pérez",
            contenido:
                "Hola a todos, ¿cómo van con el proyecto de matemáticas?",
            fecha: "10:30",
            propio: false,
        },
        {
            id: 2,
            remitente: "Ana García",
            contenido:
                "Yo ya terminé la primera parte, pero tengo dudas sobre la sección de análisis",
            fecha: "10:32",
            propio: false,
        },
        {
            id: 3,
            remitente: "Tú",
            contenido:
                "Yo puedo ayudarte con eso, Ana. ¿Qué dudas tienes específicamente?",
            fecha: "10:35",
            propio: true,
        },
        {
            id: 4,
            remitente: "Ana García",
            contenido:
                "Gracias! No entiendo bien cómo aplicar la fórmula en el ejercicio 3. ¿Podríamos reunirnos mañana para revisarlo?",
            fecha: "10:38",
            propio: false,
        },
        {
            id: 5,
            remitente: "Tú",
            contenido:
                "Claro, sin problema. ¿Te parece bien a las 3pm en la biblioteca?",
            fecha: "10:40",
            propio: true,
        },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Chat
                    </h1>
                    <p className="text-muted-foreground">
                        Grupo: Matemáticas Avanzadas
                    </p>
                </div>

                <Card className="h-[calc(100vh-200px)] sm:h-[calc(100vh-250px)]">
                    <CardHeader className="px-4 py-3 border-b">
                        <CardTitle className="text-lg">
                            Matemáticas Avanzadas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col h-[calc(100%-120px)]">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {mensajes.map((mensaje) => (
                                <div
                                    key={mensaje.id}
                                    className={`flex ${
                                        mensaje.propio
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`flex gap-2 max-w-[90%] sm:max-w-[80%] ${
                                            mensaje.propio
                                                ? "flex-row-reverse"
                                                : ""
                                        }`}
                                    >
                                        {!mensaje.propio && (
                                            <Avatar className="h-8 w-8 flex-shrink-0">
                                                <AvatarImage
                                                    src="/placeholder.svg?height=32&width=32"
                                                    alt={mensaje.remitente}
                                                />
                                                <AvatarFallback>
                                                    {mensaje.remitente.charAt(
                                                        0
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className="min-w-0">
                                            {!mensaje.propio && (
                                                <p className="text-xs text-muted-foreground mb-1">
                                                    {mensaje.remitente}
                                                </p>
                                            )}
                                            <div
                                                className={`rounded-lg px-3 py-2 break-words ${
                                                    mensaje.propio
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-secondary text-secondary-foreground"
                                                }`}
                                            >
                                                <p className="text-sm">
                                                    {mensaje.contenido}
                                                </p>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1 text-right">
                                                {mensaje.fecha}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 sm:p-4 border-t mt-auto">
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0"
                                >
                                    <Paperclip className="h-4 w-4" />
                                    <span className="sr-only">
                                        Adjuntar archivo
                                    </span>
                                </Button>
                                <Input
                                    placeholder="Escribe un mensaje..."
                                    className="flex-1"
                                />
                                <Button size="icon" className="shrink-0">
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">
                                        Enviar mensaje
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
