'use client'

import authStore from "@/zustand/authstore";
import { useRouter } from "next/navigation";
import { ReactNode, useLayoutEffect } from "react";
import toast from "react-hot-toast";

export default function Layout({ children }: { children: ReactNode }) {
    const userChecked = authStore((state) => state?.isVerified)
    const router = useRouter()

    useLayoutEffect(() => {
        if (userChecked && userChecked == false) {
            router.push('/profile-user/profile')
            toast.error('Harap verifikasi email anda!')
        }
    }, [userChecked])

    return (
        <>
            {children}
        </>
    );
}