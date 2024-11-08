'use client';

import { usePathname } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';
import { loginSchema } from '@/features/login/schema/loginSchema';
import { ErrorMessage } from 'formik';
import { useMutation } from '@tanstack/react-query';
import instance from '@/utils/axiosInstance/axiosInstance';
import toast from 'react-hot-toast';
import authStore from '@/zustand/authstore';

export default function Page() {
    const token = authStore((state) => state.setAuth)
    const { mutate: handleLogin, isPending } = useMutation({
        mutationFn: async ({ email, password }: { email: string, password: string }) => {
            return await instance.post('/auth/login/event-organizer', {
                email,
                password
            })
        },
        onSuccess: (res) => {
            token({ token: res.data.data.token })
            toast.success('suz')
            console.log(res)
        },
        onError: (error) => {
            console.log('err')
            console.log(error);
        }
    })

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return (
        <main className="h-svh md:h-lvh flex justify-center items-center">
            <section className="w-[800px] h-[500px] justify-center items-center flex rounded-xl">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={loginSchema}
                    onSubmit={(values) => {
                        handleLogin({
                            email: values.email,
                            password: values.password
                        })
                    }}
                >
                    <Form className="w-full flex flex-col px-10 gap-7">
                        <div id="email-input" className="flex flex-col">
                            <div className="flex gap-3">
                                <label htmlFor="email" className="text-sm md:text-base">
                                    Email Organizer <span className="text-red-500">*</span>
                                </label>
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Username..."
                                className="py-2 text-sm mt-3 rounded-lg px-4 border focus:outline-none active:border focus:border-yellow-400"
                            />
                        </div>
                        <div id="password-input" className="relative">
                            <div className="flex gap-3">
                                <label htmlFor="password" className="text-sm md:text-base">
                                    Kata Sandi <span className="text-red-500">*</span>
                                </label>
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-sm mt-1 gap-0"
                                />
                            </div>
                            <div className="relative">
                                <Field
                                    name="password"
                                    id="password"
                                    placeholder="Password..."
                                    type={passwordVisible ? 'text' : 'password'}
                                    className="rounded-lg mt-3 text-sm focus:outline-none active:border focus:border-yellow-400
                                w-full px-4 py-2 border border-gray-300  pr-10"
                                />
                                <span
                                    className="absolute top-1/2 right-3 translate-y-0 flex items-center cursor-pointer text-gray-500"
                                    onClick={togglePasswordVisibility}
                                >
                                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>
                        <button
                            disabled={isPending}
                            type="submit"
                            className="text-white disabled:bg-neutral-300 text-sm rounded-lg w-full py-2 bg-yellow-500 hover:bg-yellow-600"
                        >
                            Masuk
                        </button>
                        <div className="flex w-full justify-between items-center">
                            <div className="flex justify-start">
                                <input type="checkbox" name="checkbox" id="checkbox" />
                                <h1 className="pl-3 text-sm md:text-base">Ingat saya</h1>
                            </div>
                            <h1 className='text-sm md:text-base'>Lupa kata sandi?</h1>
                        </div>
                        <Link
                            href="/auth/register"
                            className="text-white text-sm rounded-lg text-center w-full py-2 bg-blue-900 hover:bg-blue-950"
                        >
                            Daftar
                        </Link>
                    </Form>
                </Formik>
            </section>
        </main>
    );
}
