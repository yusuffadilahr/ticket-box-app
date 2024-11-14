'use client';

import instance from '@/utils/axiosInstance/axiosInstance';
import authStore from '@/zustand/authstore';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Page() {
  const ownerName = authStore((state) => state?.ownerName);
  const organizerName = authStore((state) => state?.organizerName);
  const profilePicture = authStore((state) => state?.profilePicture);
  const isVerified = authStore((state) => state?.isVerified);
  const identityNumber = authStore((state) => state?.identityNumber);
  const phoneNumber = authStore((state) => state?.phoneNumber);
  const email = authStore((state) => state?.email);

  const { mutate: sendVerifyCode } = useMutation({
    mutationFn: async () => {
      return await instance.get('/event-organizer/send-email-verify');
    },
    onSuccess: (res) => {
      console.log(res);
      toast.success('Harap cek email anda secara berkala!');
    },
    onError: (err) => {
      toast.error('gagal!');
      console.log(err);
    },
  });

  const { data: getEventData } = useQuery({
    queryKey: ['get-event-list'],
    queryFn: async () => {
      const res = await instance.get(`/event/organizer-event`);
      console.log(res.data.data);
      return res.data.data;
    },
  });

  console.log(getEventData);
  return (
    <main className="w-full flex h-fit py-10 gap-5">
      <section className="w-full items-center flex flex-col py-8 px-2 rounded-lg shadow-lg bg-white">
        <div className="flex items-center gap-5 justify-between w-full px-10">
          <div className="h-20 rounded-full w-full flex items-center gap-5">
            <Image
              width={500}
              height={500}
              alt="profile-photos"
              src={profilePicture}
              className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col">
              <h1 className="text-base font-bold text-black">
                {ownerName ? ownerName?.split(' ')[0] : 'Owner Name'}
              </h1>
              <h1 className="text-neutral-500 text-sm">
                {organizerName ? organizerName : 'Organizer Name'}
              </h1>
            </div>
          </div>
          {isVerified == false ? (
            <button
              onClick={() => sendVerifyCode()}
              className="text-xs text-neutral-500 hover:text-black"
            >
              Verifikasi Sekarang
            </button>
          ) : (
            ''
          )}
        </div>
        <div className="w-full h-fit px-10 pt-7 flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="font-bold text-base">Nama Organisasi</h1>
            <h1 className="text-neutral-500 text-xs">
              {organizerName ? organizerName : 'Example Company'}
            </h1>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-base">Nomor Identitas</h1>
            <h1 className="text-neutral-500 text-xs">
              {identityNumber ? identityNumber : '32214...'}
            </h1>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-base">Nomor Telepon</h1>
            <h1 className="text-neutral-500 text-xs">
              {phoneNumber ? phoneNumber : '+628...'}
            </h1>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="font-bold text-base">Email</h1>
              <h1 className="text-neutral-500 text-xs">
                {email ? email : 'example@gmail.com'}
              </h1>
            </div>
            <div className="flex items-center text-xs text-neutral-500">
              {isVerified == false ? (
                <h1>Belum terverifikasi</h1>
              ) : (
                <h1>Terverifikasi</h1>
              )}
            </div>
          </div>
        </div>
        <div className="w-full px-10 pt-6">
          <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Ubah Profil
          </button>
        </div>
      </section>
      <section className="flex flex-col w-full gap-4">
        <div className="w-full h-72 rounded-lg bg-white shadow-lg px-10 py-5 overflow-y-auto">
          <h1 className="text-base font-bold pb-4">Event List</h1>
          <table className="w-full text-xsll text-center border">
            <thead>
              <tr>
                <th className="border">No</th>
                <th className="border">Event</th>
                <th className="border">Action</th>
              </tr>
            </thead>
            <tbody>
              {getEventData?.eventList?.length > 0 ? (
                getEventData?.eventList?.map((event: any, index: any) => (
                  <tr key={index}>
                    <td className="border py-2">{index + 1}</td>
                    <td className="border py-2">
                      {event?.eventName?.length > 13
                        ? event?.eventName.slice(0, 13)
                        : event?.eventName}
                    </td>{' '}
                    <td className="border py-2 text-blue-400 text-sm">
                      <Link href={'/event/dashboard/list-event'}>Detail</Link>
                    </td>{' '}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="row-span-3 text-center py-2" colSpan={3}>
                    TIDAK ADA DATA
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full h-44 rounded-lg bg-red-600 p-5 text-white shadow-lg">
          <h1 className="text-base font-bold pb-2">Upcoming Events</h1>
        </div>
      </section>
    </main>
  );
}
