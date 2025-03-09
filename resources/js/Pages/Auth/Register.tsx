import InputError from "@/Components/old/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function RegistroPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };
    return (
        <AuthLayout>
            <Head title="Register" />

            <div className="space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Crear cuenta
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Ingresa tus datos para registrarte en ProActiva
                    </p>
                </div>
                <form onSubmit={submit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nombre">Nombre</Label>
                                <Input
                                    id="nombre"
                                    value={data.nombre}
                                    autoComplete="name"
                                    placeholder="Juan"
                                    onChange={(e) =>
                                        setData("nombre", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.nombre}
                                    className="mt-2"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="apellido">Apellido</Label>
                                <Input
                                    id="apellido"
                                    value={data.apellido}
                                    onChange={(e) =>
                                        setData("apellido", e.target.value)
                                    }
                                    placeholder="Pérez"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                placeholder="usuario@ejemplo.com"
                                type="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">
                                Confirmar contraseña
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>
                        <Button className="w-full" type="submit">
                            Registrarse
                        </Button>
                    </div>
                    <div className="text-center text-sm">
                        ¿Ya tienes una cuenta?{" "}
                        <Link
                            href={route("login")}
                            className="text-primary hover:underline"
                        >
                            Inicia sesión
                        </Link>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
