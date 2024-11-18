'use client'

import bg from "../../../../../../../apps/web/public/daftar-cr.webp"
import Image from "next/image"
import logo from "../../../../../../../apps/web/public/Logo.webp"
import { Formik } from 'formik';
import Link from "next/link";
import { registerOrganizerSchema } from "../../../../features/register-organizer/schema/registerOrganizerSchema";
import { useRouter } from "next/navigation";
import WelcomeCard from "../../../../features/event-organizer/register/components/RegisterOrganizer";
import FormInput from "../../../../features/event-organizer/register/components/FormInput";
import useMutateRegisterEventOrganizer from "../../../../features/event-organizer/register/hooks/useMutateRegisterEventOrganizer";


export default function RegisterOrganizer() {
    const { handleRegister, isPending } = useMutateRegisterEventOrganizer()

    return (
        <main className="pt-32 px-20 flex gap-5">
            <section className='flex lg:h-[800px] w-full gap-5'>
                <section className="relative lg:block hidden w-1/2 h-full">
                    <Image
                        src={bg}
                        alt="background"
                        className="rounded-xl object-cover h-full w-full shadow-lg"
                    />
                </section>
                <WelcomeCard logo={logo} />

                <section className="lg:w-1/2 h-full rounded-xl border border-gray-200 shadow-lg">
                    <div className="p-10">
                        <Link href='/event-organizer/login'>
                            <button className="text-yellow-300 text-lg rounded-lg font-bold py-2 mb-6 bg-blue-500 hover:bg-blue-600 transition-all duration-300 w-full">
                                Login
                            </button>
                        </Link>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex-grow h-px bg-gray-300"></div>
                            <span className="px-4 text-gray-500 font-semibold">atau</span>
                            <div className="flex-grow h-px bg-gray-300"></div>
                        </div>
                        <h1 className="flex justify-center py-5 font-bold">Daftar untuk membuat event</h1>
                        <Formik
                            initialValues={{
                                email: '',
                                ownerName: '',
                                organizerName: '',
                                phoneNumber: '',
                                identityNumber: '',
                                password: '',
                            }}
                            validationSchema={registerOrganizerSchema}
                            onSubmit={(values) => {
                                console.log(values)
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
                            <FormInput isPending={isPending} />
                        </Formik>
                    </div>
                </section>
            </section>
        </main>
    )
}