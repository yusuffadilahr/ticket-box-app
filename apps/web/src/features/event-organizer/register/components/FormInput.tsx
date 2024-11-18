import { registerOrganizerSchema } from "@/features/register-organizer/schema/registerOrganizerSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function FormInput({ isPending }: any) {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confirmationPasswordVisible, setConfirmationPasswordVisible] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const togglePasswordConfirmationVisibility = () => {
        setConfirmationPasswordVisible(!confirmationPasswordVisible);
    };

    return (
        <Form className='flex flex-col justify-center items-center w-full space-y-4'>
            <div id="organizerName-input" className=" w-[500px]">
                <div className="flex gap-5 items-center">
                    <label>
                        Organizer Name<span className="text-red-500">*</span>
                    </label>
                    <ErrorMessage
                        name="organizerName"
                        component="div"
                        className="text-red-500 text-xs mt-1"
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
                        className="text-red-500 text-xs mt-1"
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
                        className="text-red-500 text-xs mt-1"
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
                    <div className="h-2">
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                        />
                    </div>
                </div>
                <div id="confirmPassword-input" className="relative w-[240px]">
                    <div className="flex gap-5 items-center">
                        <label>
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
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
                    <div className="h-2">
                        <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                        />
                    </div>
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
                        className="text-red-500 text-xs mt-1"
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
                        className="text-red-500 text-xs mt-1"
                    />
                </div>
                <Field
                    name="identityNumber"
                    className=" w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                    placeholder="3671...."
                    type="identityNumber"
                />
            </div>
            <button disabled={isPending} type="submit" className="z-50 disabled:bg-neutral-400 text-yellow-300 w-[500px] text-lg rounded-lg font-bold py-2 mb-6 bg-blue-500 hover:bg-blue-600 transition-all duration-300 ">
                Daftar
            </button>
        </Form>
    );
}