'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';
import { loginSchema } from '@/features/login/schema/loginSchema';
import { ErrorMessage } from 'formik';
import toast from 'react-hot-toast';
import instance from '@/utils/axiosInstance/axiosInstance';
import { useMutation } from '@tanstack/react-query';

export default function Page() {
    const navigate = useRouter()
    const { mutate: mutateResetPassword } = useMutation({
        mutationFn: async ({ email }: { email: string }) => {
            return await instance.post('/auth/forgot-password', {
                email
            })
        },
        onSuccess: (res) => {
            console.log(res)
            toast.success('Harap cek email secara berkala!')
            navigate.push('/auth/user/login-user')
        },
        onError: (err) => {
            toast.error('Maaf ada kesalahan atau mungkin email belum terdaftar!')
            console.log(err)
        }
    })


    return (
        <main className="h-svh md:h-lvh flex justify-center items-center">
            <section className="w-[800px] h-[500px] justify-center items-center flex rounded-xl">
                <Formik
                    initialValues={{
                        email: '',
                    }}
                    onSubmit={(values) => {
                        mutateResetPassword({ email: values.email })
                    }}
                >
                    <Form className="w-full flex flex-col px-10 gap-7">
                        <div id="email-input" className="flex flex-col">
                            <div className="flex gap-3">
                                <label htmlFor="email" className="text-sm md:text-base">
                                    Silahkan Masukkan Email Anda Yang Sudah Ter-Registrasi <span className="text-red-500">*</span>
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
                                placeholder="Email..."
                                className="py-2 text-sm mt-3 rounded-lg px-4 border focus:outline-none active:border focus:border-yellow-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="text-white text-sm rounded-lg w-full py-2 bg-yellow-500 hover:bg-yellow-600"
                        >
                            Kirim
                        </button>

                    </Form>
                </Formik>
            </section>
        </main>
    );
}
