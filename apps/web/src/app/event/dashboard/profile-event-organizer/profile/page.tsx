'use client';

import instance from './../../../../../utils/axiosInstance/axiosInstance';
import authStore from './../../../../../zustand/authstore';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaCashRegister } from 'react-icons/fa';
import { MdOutlineVerified } from 'react-icons/md';
import { Button } from "./../../../../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./../../../../../components/ui/dialog"
import { Input } from "./../../../../../components/ui/input"
import { Label } from "./../../../../../components/ui/label"
import { ErrorMessage, Form, Formik } from 'formik';
import { profileOrganizerSchema } from './../../../../../features/eventOrganizer/schema/profileUpdateSchema';

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

  const { data: getEventData, isFetching, refetch } = useQuery({
    queryKey: ['get-dasboard'],
    queryFn: async () => {
      const res = await instance.get('/event-organizer/attendee');
      return res?.data?.data;
    },
  });

  const { mutate: mutateUpdateProfile } = useMutation({
    mutationFn: async (fd: FormData) => {
      return await instance.patch('/event-organizer/u', fd)
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message)
      console.log(res, "<<<< res")
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
    onError: (err: any) => {
      console.log(err)
      toast.error(err?.response?.data?.message)
    }
  })

  useEffect(() => {
    console.log('<<<<<<< refetch')
    refetch()
    console.log('<<<<<<< refetch bawah')
  }, [refetch])

  if (isFetching) return (
    <main className="w-full flex flex-col h-fit gap-5">
      <div className="w-full flex flex-col px-4 bg-neutral-200 h-20 rounded-lg animate-pulse"></div>
      <div className="w-full flex h-fit gap-5">
        <section className="w-full items-center flex flex-col py-8 px-2 rounded-lg bg-neutral-200 animate-pulse">
          <div className="flex items-center gap-5 justify-between w-full px-10">
            <div className="h-20 rounded-full w-full flex items-center gap-5">
              <div className="flex flex-col"></div>
            </div>
          </div>
          <div className="w-full h-fit px-10 pt-7 flex flex-col gap-6">
            <div className="flex flex-col"></div>
            <div className="flex flex-col"></div>
            <div className="flex flex-col"></div>
            <div className="flex justify-between">
              <div className="flex flex-col"></div>
              <div className="flex items-center text-xs text-neutral-500"></div>
            </div>
          </div>
          <div className="w-full px-10 pt-6"></div>
        </section>
        <section className="flex flex-col w-full gap-4">
          <div className="w-full h-72 rounded-lg bg-neutral-200 px-10 py-5 overflow-y-auto animate-pulse"></div>
          <div className="w-full h-44 rounded-lg bg-neutral-200 p-5 text-white animate-pulse"><div className="w-full h-24 flex gap-5"></div>
          </div>
        </section>
      </div>
    </main>
  )

  console.log(getEventData, "<<<<<")

  return (
    <main className="w-full flex flex-col h-fit gap-5">
      <div className="w-full py-3 flex flex-col px-4 bg-yellow-400 rounded-lg">
        <h1 className="font-bold text-xl text-black">Profile User</h1>
        <p className="w-full text-neutral-500">Dashboard / Profile</p>
      </div>
      <div className="w-full flex h-fit gap-5">
        <section className="w-full items-center flex flex-col py-8 px-2 rounded-lg shadow-lg bg-white">
          <div className="flex items-center gap-5 justify-between w-full px-10">
            <div className="h-20 rounded-full w-full flex items-center gap-5">
              <Image
                width={500}
                height={500}
                alt="profile-photos"
                src={profilePicture}
                className="w-20 h-20 rounded-full border object-cover"
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
                className="text-xs text-neutral-500 hover:text-blue-600"
              >
                Verifikasi Sekarang
              </button>
            ) : (
              <span><MdOutlineVerified /></span>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className='w-full bg-yellow-400 hover:bg-yellow-500'>Ubah Profil</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Ubah Profil</DialogTitle>
                  <DialogDescription>
                   Harap diisi dengan nama dan foto yang benar.
                  </DialogDescription>
                </DialogHeader>
                <Formik
                  initialValues={{
                    ownerName: '',
                    organizer: '',
                    images: null
                  }}

                  validationSchema={profileOrganizerSchema}

                  onSubmit={(values) => {
                    const fd = new FormData()
                    fd.append('ownerName', values.ownerName)
                    fd.append('organizer', values.organizer)
                    if (values?.images) {
                      fd.append('images', values?.images!)
                    }

                    mutateUpdateProfile(fd)
                    console.log(values)
                  }}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <div className="grid gap-4 py-4">
                        <div className='flex flex-col'>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="ownerName" className="text-right">Name</Label>
                            <div className='relative w-full col-span-3'>
                              <Input id="ownerName" defaultValue={ownerName}
                                onChange={(e) => setFieldValue('ownerName', e.target.value)} />
                              <ErrorMessage component='div' name='ownerName' className='text-red-500 text-xs text-end top-3 right-4 absolute' />
                            </div>
                          </div>
                        </div>
                        <div className='flex flex-col'>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="organizer" className="text-right">Name</Label>
                            <div className='relative w-full col-span-3'>
                              <Input id="organizer" defaultValue={organizerName}
                                onChange={(e) => setFieldValue('organizer', e.target.value)} />
                              <ErrorMessage component='div' name='organizer' className='text-red-500 text-xs text-end top-3 right-4 absolute' />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="images" className="text-right">Profile Image</Label>
                          <input onChange={(e) => {
                            const file = e.target.files ? e.target.files[0] : null
                            if (file) {
                              setFieldValue('images', file)
                            }
                          }}
                            type="file" name="images" id="images" className="col-span-3 text-xs" />
                        </div>
                      </div>
                      <div className='w-full flex justify-end'>
                        <Button type="submit">Save changes</Button>
                      </div>
                    </Form>
                  )}
                </Formik>
                <DialogFooter>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>
        <section className="flex flex-col w-full gap-4">
          <div className="w-full h-72 rounded-lg bg-white shadow-lg px-10 py-5 overflow-y-auto">
            <h1 className="text-base font-bold pb-4">Event List</h1>
            <table className="w-full text-xs text-center border">
              <thead>
                <tr>
                  <th className="border">No</th>
                  <th className="border">Event</th>
                  <th className="border">Action</th>
                </tr>
              </thead>
              <tbody>
                {getEventData?.dataEventUser?.length > 0 ? (
                  getEventData?.dataEventUser?.map((event: any, index: any) => (
                    <tr key={index}>
                      <td className="border py-2">{index + 1}</td>
                      <td className="border py-2">
                        {event?.eventName?.length > 13
                          ? event?.eventName.slice(0, 13)
                          : event?.eventName}
                      </td>
                      <td className="border py-2 text-blue-400 text-sm">
                        <Link href={'/event/dashboard/list-event'}>Detail</Link>
                      </td>
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
          <div className="w-full h-44 rounded-lg bg-blue-400 p-5 text-white shadow-lg">
            <h1 className="text-base font-bold pb-2">
              Dashboard Event Organizer
            </h1>
            <div className="w-full h-24 flex gap-5">
              <div className="w-full h-full rounded-lg bg-white flex flex-col">
                <div className="w-full py-2">
                  <h1 className="text-black text-xs flex items-center justify-center">
                    <span className="pr-1">
                      <FaCashRegister />
                    </span>
                    | Total Amount
                  </h1>
                </div>
                <div className='flex w-full justify-center pt-3'>
                  <h1 className='text-black'><span className='font-bold'>Rp.</span> {getEventData?.totalAmount ? getEventData?.totalAmount.toLocaleString('id-ID') : 0},-</h1>
                </div>
              </div>
              <div className="w-full h-full rounded-lg bg-white flex flex-col">
                <div className="w-full py-2">
                  <h1 className="text-black text-xs flex items-center justify-center">
                    <span className="pr-1">
                      <FaCashRegister />
                    </span>
                    | Event Saya
                  </h1>
                </div>
                <div className='flex w-full justify-center pt-3'>
                  <h1 className='text-black'><span className='font-bold'></span>{getEventData?.dataEventUser?.length > 0 ? getEventData?.dataEventUser?.length : 'Belum ada'}</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
