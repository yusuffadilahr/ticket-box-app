'use client';
import { Avatar, AvatarFallback, AvatarImage } from './../../../components/ui/avatar';
import instance from './../../../utils/axiosInstance/axiosInstance';
import authStore from './../../../zustand/authstore';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect } from 'react';
import { Card, CardContent } from "./../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./../../../components/ui/tabs"
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function OrganizerDashboard() {
  const organizerName = authStore((state) => state.organizerName);
  const eventsData = authStore((state) => state.events);
  const profilePicture = authStore((state) => state.profilePicture)

  const { data: dashboardData, isFetching, refetch } = useQuery({
    queryKey: ['get-dasboard'],
    queryFn: async () => {
      const res = await instance.get('/event-organizer/attendee');
      return res?.data?.data;
    },
  });

  useEffect(() => {
    refetch()
  }, [refetch])

  const dailyStatistic = dashboardData?.dailyStatistic || []
  const chartData: { options: ApexOptions, series: any[] } = {
    options: {
      chart: { id: 'daily-chart' },
      xaxis: {
        categories: dailyStatistic?.map((item: any) => new Date(item?.createdAt).toLocaleDateString()),
      },
      title: {
        text: 'Laporan Per Hari',
        align: 'center',
        style: { fontSize: '16px', fontWeight: 'bold', color: '#333' },
      },
    },
    series: [
      {
        name: 'Laporan Hari Ini',
        data: dailyStatistic.map((item: any) => item?._sum?.totalPrice),
      },
    ],
  };

  const monthlyData = dashboardData?.monthlyStatistic?.map((item: any) => {
    const total = item.monthlyStatistics.reduce((sum: any, stat: any) => sum + (stat._sum?.totalPrice || 0), 0);

    return { month: item.month, total };
  });

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];

  const monthlyStatistic: { options: ApexOptions, series: any[] } = {
    options: {
      chart: { id: 'monthly-chart' },
      xaxis: {
        categories: monthNames,
      },
      title: {
        text: 'Statistik Bulanan',
        align: 'center',
        style: { fontSize: '16px', fontWeight: 'bold', color: '#333' },
      },
    },
    series: [
      {
        name: 'Total Pendapatan',
        data: monthlyData?.map((item: any) => item.total),
      },
    ],
  };
  
  const yearData = dashboardData?.yearlyStatistic?.map((item: any) => ({
    year: item.year,
    total: item.yearlyStatistics.reduce((sum: any, stat: any) => sum + (stat._sum?.totalPrice || 0), 0),
  }));

  const yearlyStatistic: { options: ApexOptions, series: any[] } = {
    options: {
      chart: { id: 'yearly-chart' },
      xaxis: {
        categories: yearData?.map((item: any) => item?.year),
      },
      title: {
        text: 'Statistik Tahunan',
        align: 'center',
        style: { fontSize: '16px', fontWeight: 'bold', color: '#333' },
      },
    },
    series: [
      {
        name: 'Total Pendapatan',
        data: yearData?.map((data: any) => data.total),
      },
    ],
  };


  const rangeBarChart: { options: ApexOptions, series: any[] } = {
    series: [
      {
        data: dashboardData?.weeklyStatistic?.map((item: any) => ({
          x: new Date(item?.createdAt).toLocaleDateString(),
          y: [item?._sum?.totalPrice - 1000, item?._sum?.totalPrice + 1000],
        })),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'rangeBar',
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          isDumbbell: true,
          columnWidth: 3,
          dumbbellColors: [['#008FFB', '#00E396']],
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: 'top',
        horizontalAlign: 'left',
        customLegendItems: ['Range Transaction'],
      },
      fill: {
        type: 'gradient',
        gradient: {
          type: 'vertical',
          gradientToColors: ['#00E396'],
          inverseColors: true,
          stops: [0, 100],
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        tickPlacement: 'on',
      },
      title: {
        text: 'Weekly Range Bar Chart',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#333',
        },
      },
    },
  };


  if (isFetching) return (
    <main className="flex flex-col">
      <section className='flex'>
        <div className="h-fit w-full px-8 space-y-10 p-10">
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold bg-neutral-200 animate-pulse rounded-lg py-4 px-10"></div>
            <div className='flex gap-8'>
              <div className="flex items-center px-10 font-bold animate-pulse bg-neutral-100 rounded-lg transition-all duration-300"></div>
              <Avatar className="transition-all duration-300">
                <AvatarImage src='' alt="@shadcn" />
                <AvatarFallback>TB</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="w-full h-fit grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div className=" h-24 bg-neutral-200 animate-pulse rounded-lg flex flex-col justify-center items-center" key={i}></div>
            ))}
          </div>
        </div>
      </section>
      <section className='w-full h-52 px-8'>
        <div className='bg-neutral-200 animate-pulse w-full h-full rounded-lg'></div>
      </section>
    </main>
  );

  return (
    <main className="flex">
      <section className="h-fit w-full px-8 space-y-10 p-10">
        <div className="flex justify-between items-center">
          <h1 className='font-bold text-2xl text-gray-700'>Hello {organizerName ? organizerName : 'User'}!</h1>
          <div className='hidden lg:flex gap-8'>
            <Link href="/event/dashboard/c" className="flex items-center px-4 font-bold text-white drop-shadow-lg bg-blue-500 rounded-lg hover:bg-blue-700 transition-all duration-300">
              <h1 className="font-semibold">+ Buat Event</h1>
            </Link>
            <Avatar className=" border-blue-400 border-2 hover:border-yellow-500 transition-all duration-300">
              <AvatarImage src={profilePicture} alt="profile" className='object-cover' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="w-full h-fit grid lg:grid-rows-1 grid-rows-4 grid-cols-1 lg:grid-cols-4 gap-4">
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
        <div className='flex p-5 flex-col lg:flex-row bg-white border gap-5'>
          <Tabs defaultValue="perhari" className="w-full h-fit">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="perhari">Perhari</TabsTrigger>
              <TabsTrigger value="perbulan">Perbulan</TabsTrigger>
              <TabsTrigger value="pertahun">Pertahun</TabsTrigger>
            </TabsList>
            <TabsContent value="perhari">
              <Card className='h-96'>
                <CardContent className="space-y-2 px-4 py-10">
                  <div className="col-span-2 row-span-3 rounded-lg drop-shadow-lg w-full">
                    <Chart
                      options={chartData?.options}
                      series={chartData?.series}
                      type="line"
                      width="100%"
                      height="300px"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="perbulan">
              <Card className='h-96'>
                <CardContent className="space-y-2 px-4 py-10">
                  <div className="col-span-2 row-span-3 rounded-lg drop-shadow-lg w-full">
                    <Chart
                      options={monthlyStatistic?.options}
                      series={monthlyStatistic?.series}
                      type="bar"
                      width="100%"
                      height="300px"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pertahun">
              <Card className='h-96'>
                <CardContent className="space-y-2 px-4 py-10">
                  <div className="col-span-2 row-span-3 rounded-lg drop-shadow-lg w-full">
                    <Chart
                      options={yearlyStatistic?.options}
                      series={yearlyStatistic?.series}
                      type="bar"
                      width="100%"
                      height="300px"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <Tabs defaultValue="totalAmount" className="w-full lg:w-2/3 h-fit">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="totalAmount">Total Amount</TabsTrigger>
            </TabsList>
            <TabsContent value="totalAmount">
              <Card className='h-96'>
                <CardContent className="space-y-2 px-4 py-10">
                  <div className="col-span-2 row-span-3 rounded-lg drop-shadow-lg w-full">
                    <Chart
                      options={rangeBarChart?.options}
                      series={rangeBarChart?.series}
                      type="rangeBar"
                      height={'300px'}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
