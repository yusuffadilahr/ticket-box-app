'use client';

import Image from 'next/image';
import CarouselSlider from '@/components/carousell';
import waras from './../../waras.png';
import { useMutation, useQuery } from '@tanstack/react-query';
import instance from '@/utils/axiosInstance/axiosInstance';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import authStore from '@/zustand/authstore';
import { CiMusicNote1 } from 'react-icons/ci';
import { PiPersonSimpleWalkThin } from 'react-icons/pi';
import { CiTrophy } from 'react-icons/ci';
import { CiMicrophoneOn } from 'react-icons/ci';
import { GiBlackBook } from 'react-icons/gi';
import Cookies from 'js-cookie';
import TopSeller from '@/features/homepage/components/topSeller';
import KategoriSection from '@/features/homepage/components/kategori';
import KomediSection from '@/features/homepage/components/komedi';
import Terbaru from '@/features/homepage/components/terbaru';
import Musik from '@/features/homepage/components/musik';
import { QueryGetDataHooks } from '@/features/homepage/hooks/QueryGetDataHooks';

export default function Home() {
  const router = useRouter();
  const token = authStore((state) => state.token);
  const setAuth = authStore((state) => state.setAuth);
  const role = authStore((state) => state.role);


  const {
    queryGetDataNewest,
    queryGetDataTopSell,
    queryGetComedyEvent,
    queryGetCategoryMusic,
    queryGetCarousel
  } = QueryGetDataHooks()

  // const { data: queryGetDataNewest } = useQuery({
  //   queryKey: ['Get-data-newest'],
  //   queryFn: async () => {
  //     const res = await instance.get('/event/newest-event');
  //     return res.data.data;
  //   },
  // });

  // const { data: queryGetDataTopSell } = useQuery({
  //   queryKey: ['Get-data-top-sell'],
  //   queryFn: async () => {
  //     const res = await instance.get('/event/bestseller-event');
  //     console.log(res.data.data, 'getdatatopsell');
  //     return res.data.data;
  //   },
  // });

  // const { data: queryGetComedyEvent } = useQuery({
  //   queryKey: ['Get-comedy-event'],
  //   queryFn: async () => {
  //     const res = await instance.get('/event/comedy-event');
  //     return res.data.data;
  //   },
  // });

  // const { data: queryGetCategoryMusic } = useQuery({
  //   queryKey: ['get-event-data-music'],
  //   queryFn: async () => {
  //     const res = await instance.get('/event/search', {
  //       params: {
  //         category: 1,
  //       },
  //     });
  //     return res.data.data.eventSearch;
  //   },
  // });

  // const { data: queryGetCarousel } = useQuery({
  //   queryKey: ['get-event-data-carousel'],
  //   queryFn: async () => {
  //     const res = await instance.get('/event/carousel-images', {});
  //     return res.data.data;
  //   },
  // });

  useEffect(() => {
    if (role && role == 'EO') {
      router.push('/user/login');
      setAuth({ token: '' });
      Cookies.remove('role');
      Cookies.remove('token');
    }
  }, [role, token]);

  const categoryList = [
    {
      logo: 'CiMusicNote1',
      name: 'Musik',
      link: 'http://localhost:3000/event/explore?page=1&category=1',
    },
    {
      logo: 'PiPersonSimpleWalkThin',
      name: 'Expo',
      link: 'http://localhost:3000/event/explore?page=1&category=2',
    },
    {
      logo: 'CiTrophy',
      name: 'Olahraga',
      link: 'http://localhost:3000/event/explore?page=1&category=3',
    },
    {
      logo: 'CiMicrophoneOn',
      name: 'Komedi',
      link: 'http://localhost:3000/event/explore?page=1&category=4',
    },
    {
      logo: 'GiBlackBook',
      name: 'Seminar',
      link: 'http://localhost:3000/event/explore?page=1&category=5',
    },
  ];

  const iconComponents = {
    CiMusicNote1: CiMusicNote1,
    PiPersonSimpleWalkThin: PiPersonSimpleWalkThin,
    CiTrophy: CiTrophy,
    CiMicrophoneOn: CiMicrophoneOn,
    GiBlackBook: GiBlackBook,
  };

  return (
    <main className="space-y-8">
      <div className="w-full sm:h-[700px] lg:h-[750px] sm:px-2 lg:px-28 pt-20 lg:pt-28">
        <CarouselSlider data={queryGetCarousel} />
      </div>

      <TopSeller
        queryGetDataTopSell={queryGetDataTopSell}
      />

      <KategoriSection
        categoryList={categoryList}
        iconComponents={iconComponents}
      />


      <KomediSection
        queryGetComedyEvent={queryGetComedyEvent}
        waras={waras}
      />

      <Terbaru
        queryGetDataNewest={queryGetDataNewest}
      />

      <Musik
        queryGetCategoryMusic={queryGetCategoryMusic}
      />

      <Link href="/event-organizer/benefit" className="px-8 lg:px-20 mt-8 flex justify-center">
        <Image
          src="https://tiketevent.com/assets/admin/img/banner-home/about-banner.webp"
          width={1200}
          height={800}
          alt="event organizer"
        />
      </Link>
    </main>
  );
}
