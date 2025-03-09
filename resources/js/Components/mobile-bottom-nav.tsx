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
        href: "/",
        icon: Home,
    },
    {
        name: "Grupos",
        href: "/grupos",
        icon: Users,
    },
    {
        name: "Tareas",
        href: "/tareas",
        icon: CheckSquare,
    },
    {
        name: "Chat",
        href: "/chat",
        icon: MessageSquare,
    },
    {
        name: "Config",
        href: "/configuracion",
        icon: Settings,
    },
];

export function MobileBottomNav() {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-10">
            <nav className="flex justify-between items-center">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center py-2 px-3 flex-1 text-xs"
                        )}
                    >
                        <item.icon className="h-5 w-5 mb-1" />
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
