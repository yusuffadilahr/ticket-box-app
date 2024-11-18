
'use client'
import { Formik, Field, Form } from 'formik';
import ProfileHeader from "./../../../components/profile/profile";
import LeftMenu from "./../../../components/profile/leftMenu";
import authStore from './../../../zustand/authstore';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "./../../../components/ui/avatar"
import { useMutation, useQuery } from '@tanstack/react-query';
import instance from './../../../utils/axiosInstance/axiosInstance';
import toast from 'react-hot-toast';


export default function ProfileHome() {
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader: any = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFieldValue('images', file);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
            setFieldValue('images', null);
        }
    };

    const dataReferral = authStore((state) => state.referralCode)
    const dataEmail = authStore((state) => state.email)
    const firstName = authStore((state) => state.firstName)
    const lastName = authStore((state) => state.lastName)
    const phoneNumber = authStore((state) => state.phoneNumber)
    const identityNumber = authStore((state) => state.phoneNumber)


    const { mutate: mutateProfileUpdate } = useMutation({
        mutationFn: async (fd) => {
            return await instance.patch('/user/user-profile/', fd)
        },
        onSuccess: (res) => {
            toast.success(res?.data?.message)
            console.log(res)
            window.location.reload()
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message)
            console.log(err)
        }
    })

    return (
        <main className="pt-28 lg:px-20 flex w-screen lg:justify-start flex-col lg:block">
            <section className="w-full flex justify-between items-center">
                <ProfileHeader />
            </section>

            <section className="flex flex-col lg:flex-row ">
                <section className="mt-10 w-full lg:w-1/4 flex h-fit">
                    <LeftMenu />
                </section>
                <section className="w-full lg:w-3/4 bg-white rounded-lg shadow-lg mt-4 lg:mt-0 lg:ml-5 p-5">

                    <h2 className="text-xl font-semibold mb-5">Pengaturan Akun</h2>

                    <Formik
                        initialValues={{
                            images: null as File | null,
                            firstName: firstName || '',
                            lastName: lastName || '',
                            phoneNumber: phoneNumber == 'Belum terisi' ? '' : phoneNumber || '',
                            identityNumber: identityNumber== 'Belum terisi' ? '' : identityNumber || '',
                        }}
                        onSubmit={(values) => {
                            const fd: any = new FormData();
                            fd.append('firstName', values.firstName)
                            fd.append('lastName', values.lastName)
                            fd.append('phoneNumber', values.phoneNumber)
                            fd.append('identityNumber', values.identityNumber)

                            if (values.images) {
                                fd.append('images', values.images);
                            }

                            mutateProfileUpdate(fd)
                        }}
                    >

                        {({ setFieldValue }) => (
                            <div className='flex flex-col lg:flex-row '>
                                <div className='space-y-2'>
                                    Ganti Profile Picture
                                    <input
                                        name="images"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleChange(e, setFieldValue)}
                                        required
                                        className='py-4'


                                    />
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <Avatar className=' border-blue-400 border-2 w-64 h-64 hover:border-yellow-500 transition-all duration-300'>
                                                <AvatarImage src={imagePreview} alt="@shadcn" className='object-cover' />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    )}
                                    
                                </div>
                                <Form className='flex flex-col justify-center items-center w-full'>
                                    <main className="flex justify-center flex-col w-[80%] md:w-[60%] lg:w-[90%]  space-y-5">
                                        <div id="email-input">
                                            <div className="flex gap-5 items-center">
                                                <label>
                                                    Email
                                                </label>

                                            </div>
                                            <Field
                                                name="email"
                                                value={dataEmail}
                                                disabled
                                                className="disabled:bg-neutral-300 disabled:text-neutral-700 w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                                                type="email"
                                            />
                                        </div>
                                        <div id="namaDepan-input">
                                            <div className="flex gap-5 items-center">
                                                <label>
                                                    Nama Depan
                                                </label>

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
                                                    Nama Belakang
                                                </label>

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
                                                    Nomor Telepon
                                                </label>

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

                                            </div>
                                            <Field
                                                name="identityNumber"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-3 focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                                                placeholder="085....."
                                            />
                                        </div>
                                        <div id="referral-input">
                                            <div className="flex gap-5 items-center">
                                                <label>
                                                    Referral Code
                                                </label>
                                            </div>
                                            <Field
                                                name="referralBody"
                                                className="disabled:bg-neutral-300 disabled:text-neutral-700 w-full px-4 py-2 border border-gray-300 rounded-lg mt-3 focus:outline-none focus:border focus:border-yellow-400 text-sm pr-10"
                                                disabled
                                                value={dataReferral}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full disabled:bg-neutral-300 bg-yellow-500 rounded-lg p-2 text-white text-sm hover:bg-yellow-600"
                                        >
                                            Update
                                        </button>
                                    </main>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </section>
            </section>
        </main>
    )
}