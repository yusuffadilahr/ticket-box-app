'use client'

import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import instance from '@/utils/axiosInstance/axiosInstance';
import authStore from '@/zustand/authstore';
import { redirect, usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

interface IAuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({ children }: IAuthProviderProps) {
    const router = useRouter()
    const pathname = usePathname()
    // const [protectAuth, setProtectAuth] = useState<boolean>(false)
    const token = authStore((state) => state.token)
    const setKeepAuth = authStore((state) => state.setKeepAuth)
    const setAuth = authStore((state) => state.setAuth)
    const role = authStore((state) => state.role)
    console.log(role)
    const fetchKeepAuth = async () => {
        try {
            const auth = await instance.get('/user/user-profile');
            setKeepAuth({
                firstName: auth?.data?.data?.firstName,
                lastName: auth?.data?.data?.lastName,
                email: auth?.data?.data?.email,
                role: auth?.data?.data?.role,
                phoneNumber: auth?.data?.data?.phoneNumber,
                profilePicture: auth?.data?.data?.profilePicture,
                referralCode: auth?.data?.data?.refferalCode,
                identityNumber: auth?.data?.data?.identityNumber,
                isVerified: auth?.data?.data?.isVerified,
                ownerName: auth?.data?.data?.ownerName,
                organizerName: auth?.data?.data?.organizerName,
                point: auth?.data?.data?.point,
                discount: auth?.data?.data?.discount
            })
            console.log(auth)
        } catch (err) {
            console.log(err);
        }
    }; 

    useLayoutEffect(() => {
        if (token) {
            fetchKeepAuth()
        }
    }, [token])

    useLayoutEffect(() => {
        if (token && (pathname == '/auth/user/login-user' || pathname == '/auth/user/register-user')) {
            return router.push('/')
        }
    }, [token, router])

    return (
        <>
            {children}
        </>
    )
}