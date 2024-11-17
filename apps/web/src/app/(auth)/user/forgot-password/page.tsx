'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
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
            toast.success(res?.data?.message)
            navigate.push('/user/login')
        },
        onError: (err: any) => {
            toast.error('Maaf ada kesalahan atau mungkin email belum terdaftar!')
            console.log(err?.response?.data?.message)
        }
    })


    return (
        <main className="h-svh md:h-lvh flex justify-center items-center">
            <section className='w-full h-fit flex justify-center items-center'>
                <div className="justify-center w-[50%] bg-white shadow-md py-10 items-center flex rounded-xl flex-col">
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
                </div>
            </section>
        </main>
    );
}
