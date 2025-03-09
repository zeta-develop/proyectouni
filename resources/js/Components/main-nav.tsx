import {
    Home,
    Users,
    CheckSquare,
    MessageSquare,
    Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

const navItems = [
    {
        name: "Inicio",
        href: "/dashboard",
        icon: Home,
    },
    {
        name: "Grupos",
        href: "/dashboard/grupos",
        icon: Users,
    },
    {
        name: "Tareas",
        href: "/dashboard/tareas",
        icon: CheckSquare,
    },
    {
        name: "Chat",
        href: "/dashboard/chat",
        icon: MessageSquare,
    },
    {
        name: "Configuración",
        href: "/dashboard/configuracion",
        icon: Settings,
    },
];

export function MainNav() {
    return (
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "flex items-center text-sm font-medium transition-colors hover:text-primary"
                    )}
                >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                </Link>
            ))}
        </nav>
    );
}
