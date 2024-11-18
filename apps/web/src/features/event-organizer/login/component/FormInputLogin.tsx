import { ErrorMessage, Field, Form } from "formik";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function FormInputLogin({ isPending }: any) {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return (
        <Form className="flex flex-col justify-center items-center w-full space-y-4">
            <div id="emailOrganizer-input" className="w-full">
                <div className="flex gap-5 items-center">
                    <label className='text-sm lg:text-base'>
                        Email Organizer <span className="text-red-500">*</span>
                    </label>
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-[5px] md:text-xs lg:text-sm mt-1"
                    />
                </div>
                <Field
                    name="email"
                    className=" w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                    placeholder="example@gmail.com"
                    type="email"
                />
            </div>
            <div id="password-input" className="relative w-full">
                <div className="flex gap-5 items-center">
                    <label className='text-sm lg:text-base'>
                        Password <span className="text-red-500">*</span>
                    </label>
                    <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-[5px] md:text-xs lg:text-sm mt-1"
                    />
                </div>
                <Field
                    name="password"
                    className=" w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                    placeholder="******"
                    type={passwordVisible ? 'text' : 'password'}
                />
                <span
                    className="absolute right-3 transform -translate-y-7 flex items-center cursor-pointer text-gray-500" // Center the icon vertically
                    onClick={togglePasswordVisibility}
                >
                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </span>
            </div>
            <button
                disabled={isPending}
                type="submit"
                className="text-yellow-300 disabled:text-neutral-800 disabled:bg-neutral-300 w-full rounded-lg font-bold py-2 text-sm bg-blue-500 hover:bg-blue-600 transition-all duration-300 "
            >
                Login
            </button>
            <div className="flex w-full justify-between items-center">
                <div className="flex justify-start">
                    <input type="checkbox" name="checkbox" id="checkbox" />
                    <h1 className="pl-3 text-sm md:text-base">Ingat saya</h1>
                </div>
                <Link
                    href={'/event-organizer/forgot-password'}
                    className="text-sm md:text-base"
                >
                    Lupa kata sandi?
                </Link>
            </div>
        </Form>
    );
}