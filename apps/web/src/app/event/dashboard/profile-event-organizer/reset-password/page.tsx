'use client'
import { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { useMutation } from "@tanstack/react-query";
import instance from './../../../../../utils/axiosInstance/axiosInstance';
import { resetPasswordProfile } from "./../../../../../features/resetPasswordProfile/schema/resetPasswordProfile";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OrganizerResetPass() {
    const router = useRouter()
    const { mutate: mutateResetPasswordProfile } = useMutation({
        mutationFn: async ({ existingPassword, password }: { existingPassword: string, password: string }) => {
            return await instance.patch('/event-organizer/reset', {
                existingPassword,
                password
            })
        },
        onSuccess: (res) => {
            toast.success(res?.data?.message)
            router.push('/event/dashboard')
            console.log(res)
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message)
            console.log(err)
        }
    })


    const [existingPasswordVisible, setExistingPasswordVisible] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confirmationPasswordVisible, setConfirmationPasswordVisible] = useState<boolean>(false);

    const toggleExistingPasswordVisibility = () => {
        setExistingPasswordVisible(!existingPasswordVisible);
    };
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const togglePasswordConfirmationVisibility = () => {
        setConfirmationPasswordVisible(!confirmationPasswordVisible);
    };

    return (
        <main className="w-full">
            <section className="w-full py-3 flex flex-col px-4 bg-yellow-400 rounded-lg mb-6">
                <h1 className="font-bold text-xl text-black">Reset Password</h1>
                <p className="w-full text-neutral-500">Dashboard / Reset Password</p>
            </section>
            <section className="flex justify-center w-full">
                <section className="w-full bg-white rounded-lg shadow-lg p-5 h-fit py-10">
                    <h2 className="text-xl font-semibold mb-5 flex">Ganti Password</h2>
                    <Formik
                        validationSchema={resetPasswordProfile}
                        initialValues={{
                            existingPassword: '',
                            password: ''
                        }}
                        onSubmit={(values) => {
                            console.log(values)
                            mutateResetPasswordProfile({
                                existingPassword: values?.existingPassword,
                                password: values?.password
                            })
                        }}
                    >
                        <Form className='flex flex-col justify-center items-center w-full'>
                            <main className="flex justify-center flex-col w-[80%] md:w-[60%] lg:w-full space-y-5">
                                <div id="password-input" className="relative">
                                    <div className="flex gap-2 items-center">
                                        <label>
                                            Kata Sandi Lama<span className="text-red-500">*</span>
                                        </label>
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-red-500 text-xs mt-1"
                                        />
                                    </div>
                                    <Field
                                        name="existingPassword"
                                        type={existingPasswordVisible ? 'text' : 'password'}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-3 focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                                        placeholder="Password..."
                                    />
                                    <span
                                        className="absolute top-1/2 right-3 translate-y-3 flex items-center cursor-pointer text-gray-500"
                                        onClick={toggleExistingPasswordVisibility}
                                    >
                                        {existingPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>
                                <div id="password-input" className="relative">
                                    <div className="flex gap-5 items-center">
                                        <label>
                                            Kata Sandi Baru<span className="text-red-500">*</span>
                                        </label>
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-red-500 text-xs mt-1"
                                        />
                                    </div>
                                    <Field
                                        name="password"
                                        type={passwordVisible ? 'text' : 'password'}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-3 focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                                        placeholder="Password..."
                                    />
                                    <span
                                        className="absolute top-1/2 right-3 translate-y-3 flex items-center cursor-pointer text-gray-500"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>
                                <div id="confirmationPassword-input" className="relative">
                                    <div className="flex gap-5 items-center">
                                        <label>
                                            Konfirmasi Kata Sandi Baru <span className="text-red-500">*</span>
                                        </label>
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component="div"
                                            className="text-red-500 text-xs mt-1"
                                        />
                                    </div>
                                    <Field
                                        name="confirmPassword"
                                        type={confirmationPasswordVisible ? 'text' : 'password'}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-3 focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                                        placeholder="Confirm Password..."
                                    />
                                    <span
                                        className="absolute top-1/2 right-3 translate-y-3 flex items-center cursor-pointer text-gray-500"
                                        onClick={togglePasswordConfirmationVisibility}
                                    >
                                        {confirmationPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full disabled:bg-neutral-300 bg-yellow-500 rounded-lg p-2 text-white text-sm hover:bg-yellow-600"
                                >
                                    Konfirmasi
                                </button>
                            </main>
                        </Form>
                    </Formik>
                </section>
            </section>
        </main>
    )
}