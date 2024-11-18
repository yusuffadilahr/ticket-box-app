'use client'

import axios from "axios";
import toast from "react-hot-toast";
import authStore from "./../../zustand/authstore";

const instance = axios.create({
    baseURL: "http://localhost:8000/api/"
})

instance.interceptors.request.use(
    async request => {
        const token = authStore.getState().token;
        if (token) {
            request.headers['Authorization'] = `Bearer ${token}`
        }

        return request
    },
    error => {
        console.log('Error Interceptor')
        console.log(error)
    }
)

instance.interceptors.response.use(
    async response => {
        return response;
    },

    error => {
        if (error?.response?.data?.message === 'jwt expired') {
            const setAuthLogout = authStore.getState().setAuthLogout;
            setAuthLogout()
            toast.error('Your Session Expiry')
            setTimeout(() => {
                window.location.href = '/'
            }, 2000)
        }

        return Promise.reject(error);
    }
);


export default instance;