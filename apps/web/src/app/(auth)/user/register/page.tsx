'use client';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { registerUserSchema } from './../../../../features/register/schema/registerSchema';
import { useMutation } from '@tanstack/react-query';
import instance from '../../../../utils/axiosInstance/axiosInstance';
import { toast } from "react-hot-toast";
import { IDataRegister } from './type';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter()
    const { mutate: handleRegister, isPending } = useMutation({
        mutationFn: async ({ firstName, lastName, email, password, phoneNumber, identityNumber, referralBody }: IDataRegister) => {
            return await instance.post('/auth/register/user', { firstName, lastName, email, password, phoneNumber, identityNumber, referralBody })
        },
        onSuccess: (res) => {
            console.log(res)
            toast.success(res.data.message)
            router.push('/user/login')
        },
        onError: (err) => {
            console.log(err)
            toast.error('ini gagal') 
        }
    })

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confirmationPasswordVisible, setConfirmationPasswordVisible] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const togglePasswordConfirmationVisibility = () => {
        setConfirmationPasswordVisible(!confirmationPasswordVisible);
    };

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                phoneNumber: '',
                identityNumber: '',
                referralBody:''
            }}
            validationSchema={registerUserSchema}
            onSubmit={(values) => {
                handleRegister({
                    firstName: values?.firstName,
                    lastName: values?.lastName,
                    email: values?.email,
                    password: values?.password,
                    phoneNumber: values?.phoneNumber,
                    identityNumber: values?.identityNumber,
                    referralBody:values?.referralBody
                })
            }}
        >
            <Form className='flex flex-col justify-center items-center w-full'>
                <main className="flex justify-center flex-col w-[80%] md:w-[60%] lg:w-[45%] mb-36 pt-24 lg:pt-32 space-y-5">
                <div className='py-2'>
                    <h1 className='text-2xl font-bold'>Daftar Sekarang!</h1>
                    <p className='text-neutral-600'>Dan ayo, jadi bagian dari komunitas kami!</p>
                </div>
                    <div id="email-input">
                        <div className="flex gap-5 items-center">
                            <label>
                                Email <span className="text-red-500">*</span>
                            </label>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>
                        <Field
                            name="email"
                            className=" w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                            placeholder="example@gmail.com"
                            type="email"
                        />
                    </div>
                    <div id="namaDepan-input">
                        <div className="flex gap-5 items-center">
                            <label>
                                Nama Depan <span className="text-red-500">*</span>
                            </label>
                            <ErrorMessage
                                name="firstName"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>
                        <Field
                            name="firstName"
                            className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                            placeholder="John"
                        />
                    </div>
                    <div id="namaBelakang-input">
                        <div className="flex gap-5 items-center">
                            <label>
                                Nama Belakang <span className="text-red-500">*</span>
                            </label>
                            <ErrorMessage
                                name="lastName"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>
                        <Field
                            name="lastName"
                            className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                            placeholder="Doe"
                        />
                    </div>
                    <div id="noTelepon-input">
                        <div className="flex gap-5 items-center">
                            <label>
                                Nomor Telepon <span className="text-red-500">*</span>
                            </label>
                            <ErrorMessage
                                name="phoneNumber"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>
                        <Field
                            name="phoneNumber"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-3 focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                            placeholder="085....."
                        />
                    </div>
                    <div id="noKTP-input">
                        <div className="flex gap-5 items-center">
                            <label>
                                Nomor KTP
                            </label>
                            <ErrorMessage
                                name="identityNumber"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>
                        <Field
                            name="identityNumber"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-3 focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                            placeholder="085....."
                        />
                    </div>
                    <div id="regerral-input">
                        <div className="flex gap-5 items-center">
                            <label>
                                Referral Code
                            </label>
                            <ErrorMessage
                                name="referralBody"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>
                        <Field
                            name="referralBody"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-3 focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                            placeholder="085....."
                        />
                    </div>
                    <div id="password-input" className="relative">
                        <div className="flex gap-5 items-center">
                            <label>
                                Kata Sandi <span className="text-red-500">*</span>
                            </label>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm mt-1"
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
                                Konfirmasi Kata Sandi <span className="text-red-500">*</span>
                            </label>
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="text-red-500 text-sm mt-1"
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
                        disabled={isPending}
                        type="submit"
                        className="w-full disabled:bg-neutral-300 bg-yellow-500 rounded-lg p-2 text-white text-sm hover:bg-yellow-600"
                    >
                        {isPending ? 'Mohon tunggu...' : 'Register'}
                    </button>
                </main>
            </Form>
        </Formik>
    );
}