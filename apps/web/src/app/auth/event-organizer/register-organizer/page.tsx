'use client'
import bg from "@/../public/daftar-cr.webp"
import Image from "next/image"
import logo from "@/../public/Logo.webp"
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { useState } from "react";
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import Link from "next/link";
import { registerOrganizerSchema } from "@/features/register-organizer/schema/registerOrganizerSchema";
import { useMutation } from "@tanstack/react-query";
import { IRegisterOrganizer } from "./type";
import instance from '@/utils/axiosInstance/axiosInstance';
import { toast } from "react-hot-toast";


export default function RegisterOrganizer() {
    const { mutate: handleRegister, isPending } = useMutation({
        mutationFn: async ({ organizerName, ownerName, email, password, phoneNumber, identityNumber }: IRegisterOrganizer) => {
            return await instance.post('/auth/register/event-organizer', {
                organizerName, ownerName, email, password, phoneNumber, identityNumber: Number(identityNumber)
            })
        },
        onSuccess: (res) => {
            console.log(res)
            toast.success(res.data.message)

        },
        onError: (err) => {
            console.log(err)
            toast.error('gagal')
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
        <main className="pt-32 px-20 flex gap-5">
            <section className="relative w-1/2 h-screen ">
                <Image
                    src={bg}
                    alt="background"
                    className="rounded-xl object-cover h-full w-full shadow-lg"
                />
            </section>
            <div className="absolute z-10 p-16 text-white">
                <Image
                    src={logo}
                    alt="background"
                    className="rounded-xl object-cover w-8 md:w-20 lg:w-48"
                />
                <div className="mt-8 font-bold text-5xl">Welcome  👋</div>
                <div className="font-bold text-4xl">Event Creator</div>
                <div className="mt-10 text-lg">Gabung jadi Event Creator dengan sangat mudah! </div>
                <div className="text-lg">Buat event dan manage tiketmu di Tiketbox.com</div>
            </div>

            <section className="w-1/2 relative h-screen rounded-xl border border-gray-200 shadow-lg">
                <div className="absolute p-10 w-full">
                    <Link href='/auth/login-organizer'>
                        <button className="text-yellow-300 text-lg rounded-lg font-bold py-2 mb-6 bg-blue-500 hover:bg-blue-600 transition-all duration-300 w-full">
                            Login
                        </button>
                    </Link>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="px-4 text-gray-500 font-semibold">atau</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>
                    <div className="flex justify-center py-5 font-bold">Daftar untuk membuat event</div>
                    <Formik
                        initialValues={{
                            email: '',
                            ownerName: '',
                            organizerName: '',
                            phoneNumber: '',
                            identityNumber: null,
                            password: '',
                        }}
                        // validationSchema={registerOrganizerSchema}
                        onSubmit={(values) => {
                            // organizerName, ownerName, email, password, phoneNumber, identityNumber
                            handleRegister({
                                organizerName: values.organizerName,
                                ownerName: values.ownerName,
                                email: values.email,
                                password: values.password,
                                phoneNumber: values.phoneNumber,
                                identityNumber: values.identityNumber
                            })
                        }}
                    >
                        <Form className='flex flex-col justify-center items-center w-full space-y-4'>
                            <div id="organizerName-input" className=" w-[500px]">
                                <div className="flex gap-5 items-center">
                                    <label>
                                        Organizer Name<span className="text-red-500">*</span>
                                    </label>
                                    <ErrorMessage
                                        name="organizerName"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                                <Field
                                    name="organizerName"
                                    className=" w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                                    placeholder="Mutiara Sakti Organizer"
                                    type="text"
                                />
                            </div>
                            <div id="owner-input" className=" w-[500px]">
                                <div className="flex gap-5 items-center">
                                    <label>
                                        Owner Name <span className="text-red-500">*</span>
                                    </label>
                                    <ErrorMessage
                                        name="ownerName"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                                <Field
                                    name="ownerName"
                                    className=" w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                                    placeholder="John Doe"
                                    type="text"
                                />
                            </div>
                            <div id="emailOrganizer-input" className=" w-[500px]">
                                <div className="flex gap-5 items-center">
                                    <label>
                                        Email Organizer<span className="text-red-500">*</span>
                                    </label>
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                                <Field
                                    name="email"
                                    className=" w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                                    placeholder="example@gmail.com"
                                    type="email"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div id="password-input" className="relative w-[240px]">
                                    <div className="flex gap-5 items-center">
                                        <label>
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                    <Field
                                        name="password"
                                        className=" w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                                        placeholder="******"
                                        type={passwordVisible ? 'text' : 'password'}
                                    />
                                    <span
                                        className="absolute  right-3 transform -translate-y-7 flex items-center cursor-pointer text-gray-500" // Center the icon vertically
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>
                                <div id="confirmPassword-input" className="relative w-[240px]">
                                    <div className="flex gap-5 items-center">
                                        <label>
                                            Confirm Password <span className="text-red-500">*</span>
                                        </label>
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                    <Field
                                        name="confirmPassword"
                                        className=" w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                                        placeholder="******"
                                        type={confirmationPasswordVisible ? 'text' : 'password'}
                                    />
                                    <span
                                        className="absolute  right-3 transform -translate-y-7 flex items-center cursor-pointer text-gray-500" // Center the icon vertically
                                        onClick={togglePasswordConfirmationVisibility}
                                    >
                                        {confirmationPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>
                            </div>
                            <div id="phoneNumber-input" className=" w-[500px]">
                                <div className="flex gap-5 items-center">
                                    <label>
                                        Nomor HP <span className="text-red-500">*</span>
                                    </label>
                                    <ErrorMessage
                                        name="phoneNumber"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                                <Field
                                    name="phoneNumber"
                                    className=" w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                                    placeholder="0856..."
                                    type="phoneNumber"
                                />
                            </div>
                            <div id="identity-input" className=" w-[500px]">
                                <div className="flex gap-5 items-center">
                                    <label>
                                        Nomor KTP <span className="text-red-500">*</span>
                                    </label>
                                    <ErrorMessage
                                        name="identityNumber"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                                <Field
                                    name="identityNumber"
                                    className=" w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                                    placeholder="3671...."
                                    type="identityNumber"
                                />
                            </div>
                            <button disabled={isPending} type="submit" className="text-yellow-300 disabled:bg-neutral-300 w-[500px] text-lg rounded-lg font-bold py-2 mb-6 bg-blue-500 hover:bg-blue-600 transition-all duration-300 ">
                                Daftar
                            </button>
                        </Form>
                    </Formik>
                </div>
            </section>
        </main>
    )
}