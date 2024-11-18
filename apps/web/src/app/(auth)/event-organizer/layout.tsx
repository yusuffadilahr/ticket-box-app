import Header from "@/features/event-organizer/component/Header";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: 'Tiket Box | Event Organizer Autentikasi',
    description: 'Welcome to Tiket Box',
};

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}