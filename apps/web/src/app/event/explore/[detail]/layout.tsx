'use client'

import authStore from "@/zustand/authstore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { ReactNode } from "react";
import toast from "react-hot-toast";

export default function Layout({ children }: { children: ReactNode }) {
    const isVerified = authStore((state) => state.isVerified)
    const role = authStore((state) => state.role)
    const [toastShow, setToastShow] = useState(false)
    const token = authStore((state) => state.token)
    const logout = authStore((state) => state.resetAuth)
    const router = useRouter()

    useLayoutEffect(() => {
        if (isVerified == false && role && role == 'user' && !toastShow) {
            setToastShow(true)
            router.push('/profile-user/profile')
            toast.error('Harap verifikasi email anda terlebih dahulu!')
        }
    }, [toastShow, isVerified])

    useLayoutEffect(() => {
        if (!token) {
            router.push('/user/login')
        }
    }, [token])

    useLayoutEffect(() => {
        if (role && role != 'user') {
            router.push('/user/login')
            logout()
            Cookies.remove('role')
            Cookies.remove('token')
        }
    }, [role, token])

    return (
        <>
            {children}
        </>
    );
}