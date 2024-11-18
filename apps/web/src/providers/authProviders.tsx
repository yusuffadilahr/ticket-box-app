'use client'

import { ReactNode, useLayoutEffect } from 'react';
import instance from './../utils/axiosInstance/axiosInstance';
import authStore from './../zustand/authstore';
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'
import dotenv from 'dotenv'

interface IAuthProviderProps {
    children: ReactNode;
}

dotenv.config()
export default function AuthProvider({ children }: IAuthProviderProps) {
    const token = authStore((state) => state.token)
    const setKeepAuth = authStore((state) => state.setKeepAuth)
    const role = authStore((state) => state.role)
    const secret_key = process.env.CRYPTO_ENCRYPT_ROLE || '12312312'

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
                discount: auth?.data?.data?.discount,
                events: auth?.data?.data?.events,
                transactions: auth?.data?.data?.transactions
            })  

            console.log(auth, "<<< auth provider")

            const encryptRole = CryptoJS.AES.encrypt(auth?.data?.data?.role, secret_key).toString()

            Cookies.set('role', encryptRole, { expires: 1 })
            Cookies.set('token', token, { expires: 1 })

        } catch (err) {
            console.log(err);
        }
    };

    useLayoutEffect(() => {
        if (token) {
            fetchKeepAuth()
        }
    }, [token])

    return (
        <>
            {children}
        </>
    )
}