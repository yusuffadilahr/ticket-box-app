'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import instance from '@/utils/axiosInstance/axiosInstance';
import authStore from '@/zustand/authstore';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function OrganizerDashboard() {
  const organizerName = authStore((state) => state.organizerName);
  const eventsData = authStore((state) => state.events);
  const profilePicture = authStore((state) => state.profilePicture)

  const yearData: any = {
    options: {
      chart: { id: 'yearly-chart' },
      xaxis: { categories: ['2022', '2023', '2024'] },
      title: {
        text: 'Registrasi Per Tahun',
        align: 'center',
        style: { fontSize: '16px', fontWeight: 'bold', color: '#333' },
      },
    },
    series: [{ name: 'Registrasi Event Tahun', data: [200, 350, 500] }],
  };

  const monthData: any = {
    options: {
      chart: { id: 'monthly-chart' },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      title: {
        text: 'Registrasi Per Bulan',
        align: 'center',
        style: { fontSize: '16px', fontWeight: 'bold', color: '#333' },
      },
    },
    series: [
      {
        name: 'Registrasi Event Bulan',
        data: [30, 40, 50, 60, 70, 80, 90, 100, 120, 130, 140, 150],
      },
    ],
  };

  const { data: dashboardData, isFetching, refetch } = useQuery({
    queryKey: ['get-dasboard'],
    queryFn: async () => {
      const res = await instance.get('/event-organizer/attendee');
      return res?.data?.data;
    },
  });

  useEffect(() => {
    console.log('<<<<<<< refetch')
    refetch()
    console.log('<<<<<<< refetch bawah')
    console.log("check length events", eventsData?.length)
  }, [refetch])

  console.log("check event data", dashboardData)
  if (isFetching) return (
    <main className="flex flex-col">
      <section className='flex'>
        <div className="h-fit w-full px-8 space-y-10 p-10">
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold bg-neutral-200 rounded-lg py-4 px-10"></div>
            <div className='flex gap-8'>
              <div className="flex items-center px-10 font-bold bg-neutral-100 rounded-lg transition-all duration-300"></div>
              <Avatar className="transition-all duration-300">
                <AvatarImage src='' alt="@shadcn" />
                <AvatarFallback>TB</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="w-full h-fit grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div className=" h-24 bg-neutral-200 rounded-lg flex flex-col justify-center items-center" key={i}></div>
            ))}
          </div>
        </div>
      </section>
      <section className='w-full h-52 px-8'>
        <div className='bg-neutral-200 w-full h-full rounded-lg'></div>
      </section>
    </main>
  );

  return (
    <main className="flex">
      <section className="h-screen w-full px-8 space-y-10 p-10">
        <div className="flex justify-between items-center">
          <h1 className='font-bold text-2xl text-gray-700'>Hello {organizerName ? organizerName : 'User'}!</h1>
          <div className='flex gap-8'>
            <Link href="/event/dashboard/c" className="flex items-center px-4 font-bold text-white drop-shadow-lg bg-blue-500 rounded-lg hover:bg-blue-700 transition-all duration-300">
              <h1 className="font-semibold">+ Buat Event</h1>
            </Link>
            <Avatar className=" border-blue-400 border-2 hover:border-yellow-500 transition-all duration-300">
              <AvatarImage src={profilePicture} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="w-full h-fit grid grid-cols-4 gap-4">
          <div className="text-white h-24 bg-cyan-500 rounded-lg flex flex-col justify-center items-center drop-shadow-lg">
            <div>Saldo Saya</div>
            <div>
              Rp.{' '}
              {dashboardData?.totalAmount
                ? dashboardData?.totalAmount?.toLocaleString('id-ID')
                : 0}
              ,-
            </div>
          </div>
          <div className="text-white bg-blue-700 rounded-lg flex flex-col justify-center items-center drop-shadow-lg">
            <div>Event Saya</div>
            <div>{dashboardData?.dataEventUser?.length > 0 ? dashboardData?.dataEventUser?.length : 0}</div>
          </div>
          <div className="text-white bg-red-500 rounded-lg flex flex-col justify-center items-center drop-shadow-lg">
            <div>Jumlah Pendaftar</div>
            <h1>
              {dashboardData?.dataAttendee?.length > 0
                ? dashboardData?.dataAttendee?.length
                : 0}
            </h1>
          </div>
          <div className="text-white bg-gray-700 rounded-lg flex flex-col justify-center items-center drop-shadow-lg">
            <div>Total Transaksi</div>
            <div>
              {dashboardData?.dataTotalTransaction?.length > 0
                ? dashboardData?.dataTotalTransaction?.length
                : 0}
            </div>
          </div>
        </div>
        <div className="flex w-full gap-5 h-96 pt-5">
          <div className="col-span-2 row-span-3 rounded-lg drop-shadow-lg w-full">
            <Chart
              options={yearData.options}
              series={yearData.series}
              type="line"
              width="100%"
              height="100%"
            />
          </div>
          <div className="col-span-2 row-span-3 rounded-lg drop-shadow-lg w-full">
            <Chart
              options={monthData.options}
              series={monthData.series}
              type="bar"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
