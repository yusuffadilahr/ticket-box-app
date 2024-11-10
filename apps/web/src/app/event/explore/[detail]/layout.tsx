'use client'

import authStore from "@/zustand/authstore";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { ReactNode } from "react";
import toast from "react-hot-toast";

export default function Layout({ children }: { children: ReactNode }) {
    // const router = useRouter()
    // const isVerified = authStore((state)=> state.isVerified)
    
    // useLayoutEffect(()=> {
    //     if(isVerified == false) {
    //         console.log(isVerified, "<<<<<<")
    //         console.log('Pindahhh')

    //         toast.error('Harap verifikasi email anda!')
    //         router.push('/profile/user-profile/home')
    //     }
    // }, [isVerified])

    console.log('<<<< line 21')
    return (
        <>
        {console.log('<<< render')}
            {children}
        </>
    );
}