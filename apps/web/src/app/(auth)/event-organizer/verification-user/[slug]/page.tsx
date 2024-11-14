'use client';
// import {
//     InputOTP,
//     InputOTPGroup,
//     InputOTPSeparator,
//     InputOTPSlot,
//   } from "@/components/ui/input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import authStore from '@/zustand/authstore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Page({ params }: { params: { slug: string } }) {
  const [value, setValue] = useState('');
  const { slug } = params;
  const token = slug.split('-TBX-')[1];
  const setAuth = authStore((state) => state.setAtuh);
  const router = useRouter();
  console.log(token);
  console.log(value);

  const { mutate: mutateVerifyCode } = useMutation({
    mutationFn: async (data: any) => {
      return await axios.patch(
        'http://localhost:8000/api/event-organizer/verify-user',
        {
          verificationCode: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      authStore.getState().resetAuth();
      Cookies.remove('role');
      Cookies.remove('token');
      router.push('/event-organizer/login');
      console.log(res);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
      console.log(err);
    },
  });

  return (
    <main className="w-full justify-center items-center flex h-screen px-20">
      <div className="w-fit px-10 justify-center flex items-center h-fit py-10 bg-white flex-col rounded-xl shadow-lg">
        <div className="py-5">
          <h1 className="text-2xl font-semibold">Masukkan Kode OTP Anda</h1>
          <p className="text-sm text-gray-600">
            Kami telah mengirimkan kode OTP ke email Anda. Silakan masukkan di
            bawah ini.
          </p>
        </div>
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="lg:w-20 lg:h-20 text-xl" />
            <InputOTPSlot index={1} className="lg:w-20 lg:h-20 text-xl" />
            <InputOTPSlot index={2} className="lg:w-20 lg:h-20 text-xl" />
            <InputOTPSlot index={3} className="lg:w-20 lg:h-20 text-xl" />
            <InputOTPSlot index={4} className="lg:w-20 lg:h-20 text-xl" />
            <InputOTPSlot index={5} className="lg:w-20 lg:h-20 text-xl" />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-center text-sm py-2 text-neutral-700">
          {value === '' ? (
            <>Silakan masukkan kode OTP yang telah Anda terima.</>
          ) : (
            <>
              Anda telah memasukkan kode OTP:{' '}
              <span className="font-bold text-black">{value}.</span> Apakah ini
              benar?
            </>
          )}
        </div>
        <div className="py-5 w-full">
          <button
            className="py-2 text-white w-full bg-yellow-400"
            type="submit"
            onClick={() => mutateVerifyCode(value)}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </main>
  );
}
