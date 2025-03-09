import { Header } from "@/Components/header";
import { MobileBottomNav } from "@/Components/mobile-bottom-nav";
import { ThemeProvider } from "@/Components/theme-provider";
import type React from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                <Header />
                <main className="flex-1 container py-6 md:py-8 pb-20 md:pb-8">
                    {children}
                </main>
                <MobileBottomNav />
            </ThemeProvider>
        </div>
    );
}
