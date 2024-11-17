'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';
import { ErrorMessage } from 'formik';
import { useMutation } from '@tanstack/react-query';
import instance from '@/utils/axiosInstance/axiosInstance';
import toast from 'react-hot-toast';
import bg from '@/../../apps/web/public/daftar-cr.webp';
import Image from 'next/image';
import logo from '@/../../apps/web/public/Logo.webp';
import { loginOrganizerSchema } from '@/features/login-organizer/schema/loginOrganizerSchema';
import authStore from '@/zustand/authstore';
import BenefitCard from '@/features/event-organizer/component/benefitCard';

export default function Page() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const setAuth = authStore((state) => state.setAuth);
  const router = useRouter();
  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await instance.post('/auth/login/event-organizer', {
        email,
        password,
      });
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      setAuth({ token: res.data.data.token });
      console.log(res);
      router.push('/event/dashboard');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
      console.log(error);
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
            }}
          >
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
