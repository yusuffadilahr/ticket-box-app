'use client';

import { Formik } from 'formik';
import bg from '../../../../../../../apps/web/public/daftar-cr.webp';
import Image from 'next/image';
import logo from '../../../../../../../apps/web/public/Logo.webp';
import { loginOrganizerSchema } from '../../../../features/loginOrganizer/schema/loginOrganizerSchema';
import BenefitCard from '../../../../features/eventOrganizer/component/benefitCard';
import FormInputLogin from '../../../../features/eventOrganizer/login/component/FormInputLogin';
import useHandleLogin from '@/features/eventOrganizer/login/hooks/useHandleLogin';

export default function Page() {
  const { handleLogin, isPending } = useHandleLogin()

  return (
    <main className="w-full h-fit bg-gray-50 lg:flex lg:flex-col p-4 lg:px-20 lg:pt-20 gap-5">
      <section className='w-full pt-16 md:mt-9 lg:pt-0 flex md:h-96 gap-5 justify-center items-center'>
        <section className="w-full px-10 md:px-14 h-fit py-10 md:py-0 md:h-full bg-white shadow-lg flex flex-col justify-center rounded-xl items-center border border-gray-200 lg:px-32">
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginOrganizerSchema}
            onSubmit={(values) => {
              console.log(values);
              handleLogin({ email: values.email, password: values.password });
            }}>

            <FormInputLogin isPending={isPending} />

          </Formik>
        </section>
        <section className="w-full h-full bg-purple-900 relative rounded-xl shadow-lg hidden md:flex justify-center items-center border border-gray-200">
          <section className="w-full h-full">
            <Image
              src={bg}
              alt="background"
              className="rounded-xl object-bottom h-full w-full shadow-lg"
            />
          </section>
          <div className="absolute top-0 left-5 z-10 text-white">
            <Image
              src={logo}
              alt="background"
              className="rounded-xl object-cover w-8 md:w-20 lg:w-48"
            />
            <div className="mt-8 font-bold text-5xl">Welcome 👋</div>
            <div className="font-bold text-4xl">Event Creator</div>
            <div className="mt-10 text-lg">Login sekarang!</div>
            <div className="text-lg">
              Buat event dan manage tiketmu di Tiketbox.com
            </div>
          </div>
        </section>
      </section>
      <BenefitCard />
    </main>
  );
}
