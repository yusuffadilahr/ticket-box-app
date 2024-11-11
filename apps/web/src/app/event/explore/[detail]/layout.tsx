'use client'

import authStore from "@/zustand/authstore";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { ReactNode } from "react";
import toast from "react-hot-toast";

export default function Layout({ children }: { children: ReactNode }) {
    const isVerified = authStore((state)=> state.isVerified)
    const role = authStore((state)=> state.role)
    const [toastShow, setToastShow] = useState(false)

    const router = useRouter()
    
    useLayoutEffect(()=> {
        if(isVerified == false && role && role == 'user' && !toastShow) {
            setToastShow(true)
            router.push('/profile-user/profile')
            toast.error('Harap verifikasi email anda terlebih dahulu!')
        }
    }, [toastShow, isVerified])

    return (
        <>
        {console.log('<<< render')}
            {children}
        </>
    );
}