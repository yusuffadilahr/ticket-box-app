'use client'
import { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ProfileHeader from "@/components/profile/profile";
import LeftMenu from "@/components/profile/leftMenu";
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { useMutation } from "@tanstack/react-query";
import instance from '@/utils/axiosInstance/axiosInstance';
import { resetPasswordProfile } from "@/features/reset-password-profile/schema/resetPasswordProfile";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfileResetPass() {
    const [existingPasswordVisible, setExistingPasswordVisible] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confirmationPasswordVisible, setConfirmationPasswordVisible] = useState<boolean>(false);
    const router = useRouter()

    const { mutate: mutateResetPasswordProfile } = useMutation({
        mutationFn: async ({ existingPassword, password }: { existingPassword: string, password: string }) => {
            return await instance.patch('/auth/reset-password-profile', {
                existingPassword,
                password
            })
        },
        onSuccess: (res) => {
            console.log(res)
            toast.success('Berhasil mengubah password!')
            router.push('/')
        },
        onError: (err) => {
            toast.error('Gagal!')
            console.log(err)
        }
    })

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
        <main className="pt-28 px-20">
            <section className=" flex justify-between items-center">
                <ProfileHeader />
            </section>

            <section className="flex">
                <section className="mt-10 flex h-fit">
                    <LeftMenu />
                </section>
                <section className="w-3/4 bg-white rounded-lg shadow-lg ml-5 p-5">
                    <h2 className="text-xl font-semibold mb-5">Pengaturan Akun</h2>
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
                            <main className="flex justify-center flex-col w-[80%] md:w-[60%] lg:w-[100%]  space-y-5">
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
                                    Update
                                </button>
                            </main>
                        </Form>
                    </Formik>
                </section>
            </section>
        </main>
    )
}