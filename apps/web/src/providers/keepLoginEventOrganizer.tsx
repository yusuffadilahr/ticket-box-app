'use client'

import instance from "@/utils/axiosInstance/axiosInstance";
import authStore from "@/zustand/authstore";
import { ReactNode, useEffect } from "react";

export default function KeepLoginEventOrganizer({ children }: { children: ReactNode }) {
    const token = authStore((state) => state.token)
    const dataFetch = async () => {
        try {
            const res = await instance.get('/event-organizer')
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (token) {
            dataFetch()
        }
    }, [token])

    return (
        <>
            {children}
        </>
    );
}