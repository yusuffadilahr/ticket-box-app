'use client'

import { SidebarMenu } from "@/components/Sidebar";
import KeepLoginEventOrganizer from "@/providers/keepLoginEventOrganizer";
import authStore from "@/zustand/authstore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ILayoutChildren {
    children: React.ReactNode;
}
export default function RootLayout({ children }: ILayoutChildren) {
    const router = useRouter()
    const role = authStore((state) => state.role)
    const token = authStore((state) => state.token)
    console.log(!token, "<<< token")

    useEffect(() => {
        if (!token) {
            router.push('/auth/event-organizer/login-organizer')
        }
    }, [role])

    useEffect(() => {
        if (role && role != 'EO') {
            router.push('/')
        }
    }, [role])

    return (
        <>
            <main className="flex">
                <SidebarMenu />
                <section className="w-3/12 flex"></section>
                <section className="w-full flex justify-end items-end">
                    <KeepLoginEventOrganizer>
                        {children}
                    </KeepLoginEventOrganizer>
                </section>
            </main>
        </>
    )

}