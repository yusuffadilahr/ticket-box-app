'use client';

import Image from 'next/image';
import styles from './page.module.css';
import CarouselSlider from '@/components/carousell';
import waras from './../../waras.png';
import { IoLocationSharp } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';
import { useMutation, useQuery } from '@tanstack/react-query';
import instance from '@/utils/axiosInstance/axiosInstance';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter } from 'next/navigation';
import CarousellEvent from '@/components/carousell/carousellEvent';
import Link from 'next/link';
import authStore from '@/zustand/authstore';
import { CiMusicNote1 } from 'react-icons/ci';
import { PiPersonSimpleWalkThin } from 'react-icons/pi';
import { CiTrophy } from 'react-icons/ci';
import { CiMicrophoneOn } from 'react-icons/ci';
import { GiBlackBook } from 'react-icons/gi';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();
  const [eventData, setEventData] = useState<any[]>([]);
  const [valueInput, setValueInput] = useState<string>('');
  const token = authStore((state) => state.token);
  const setAuth = authStore((state) => state.setAuth);
  const role = authStore((state) => state.role);
  const pathname = usePathname();

  const { mutate: mutateSearchData } = useMutation({
    mutationFn: async (values: string) => {
      const res = await instance.get('/event/search', {
        params: {
          event: values,
        },
      });
      return res.data.data.eventSearch;
    },
    onSuccess: (res) => {
      // console.log(res);
      setEventData(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const debounce = useDebouncedCallback((values) => {
    if (values) {
      mutateSearchData(values);
    } else {
      setEventData([]);
      setValueInput('');
    }
  }, 800);

  const { data: queryGetDataNewest } = useQuery({
    queryKey: ['Get-data-newest'],
    queryFn: async () => {
      const res = await instance.get('/event/newest-event');
      console.log(res.data.data,'getdatanewest');
      return res.data.data;
    },
  });

  const { data: queryGetDataTopSell } = useQuery({
    queryKey: ['Get-data-top-sell'],
    queryFn: async () => {
      const res = await instance.get('/event/bestseller-event');
      console.log(res.data.data, 'getdatatopsell');

      return res.data.data;
    },
  });

  const { data: queryGetComedyEvent } = useQuery({
    queryKey: ['Get-comedy-event'],
    queryFn: async () => {
      const res = await instance.get('/event/comedy-event');
      console.log(res.data.data, 'getcomedyevent');
      return res.data.data;
    },
  });

  const { data: queryGetCategoryMusic } = useQuery({
    queryKey: ['get-event-data-music'],
    queryFn: async () => {
      const res = await instance.get('/event/search', {
        params: {
          category: 1,
        },
      });
      console.log(res.data.data, 'categorymusic');
      return res.data.data.eventSearch;
    },
  });

  const { data: queryGetCarousel } = useQuery({
    queryKey: ['get-event-data-carousel'],
    queryFn: async () => {
      const res = await instance.get('/event/carousel-images', {});
      // console.log(res)
      return res.data.data;
    },
  });

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

      <div className=" px-12 lg:px-20">
        <h1 className="text-2xl font-bold">
          Top Seller
          {/* <span className="pl-3 text-blue-500 font-normal text-sm">
            Lihat Semua
          </span> */}
          <div className="mt-4">
            <CarousellEvent data={queryGetDataTopSell} />
          </div>
        </h1>
      </div>

      <section className="w-full h-fit px-20">
        <h1 className="text-2xl font-bold text-center">Category</h1>
        <div className="flex justify-center gap-5 mt-5">
          {categoryList?.map((item, index) => {
            const IconComponent: any = iconComponents[item?.logo]; // Get the correct icon component
            return (
              <Link key={index} href={item.link}>
                <div className="flex flex-col items-center gap-2">
                  <div>
                    <IconComponent className="rounded-full p-4 border-2 hover:bg-yellow-500 transition-all duration-300 border-blue-900 text-blue-900 w-[80px] h-[80px]" />
                  </div>
                  <div className="flex justify-center  font-bold text-blue-900">
                    {item.name}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <div className="relative w-full  flex justify-center items-center">
        <div className="w-full px-2 lg:px-20 h-[900px] lg:h-[700px] ">
          <Image
            src={waras}
            height={800}
            width={1200}
            alt="comedy"
            className="object-cover rounded-3xl flex w-full h-[900px] lg:h-[700px]"
          />
        </div>

        <div className="absolute space-y-12">
          <div className="text-lg lg:text-2xl font-bold text-white p-2 flex justify-center">
            Lepasin stres, mari ketawa bareng!
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 text-white gap-3 lg:gap-6 px-6 lg:px-0">
            {queryGetComedyEvent?.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  className="bg-white w-[180px] rounded-2xl lg:w-[280px] lg:h-fit pb-1"
                >
                  <Link
                    href={`/event/explore/${item.id}TBX${item.startEvent.split('T')[0].split('-').join('')}-${item.eventName.toLowerCase().split(' ').join('-')}`}
                  >
                    <div className="w-full lg:h-36">
                      <Image
                        src={
                          item?.EventImages[0]?.eventImageUrl?.includes(
                            'https://',
                          )
                            ? item.EventImages[0].eventImageUrl
                            : `http://localhost:8000/api/src/public/images/${item.EventImages[0]?.eventImageUrl || 'default-image.png'}`
                        }
                        height={142}
                        width={142}
                        alt="testing"
                        className="w-full lg:h-36 object-cover rounded-t-2xl"
                      />
                    </div>
                    <div className="text-black p-3 pt-5">
                      <div className="flex flex-col gap-2">
                        <h1 className="flex items-center gap-2 text-xs lg:text-sm text-gray-500">
                          <IoLocationSharp />
                          {item?.location.length > 20 ? (
                            <h1>{item?.location.slice(0, 20)}...</h1>
                          ) : (
                            item?.location
                          )}
                        </h1>
                        <h1 className="flex items-center gap-2 text-xs lg:text-sm text-gray-500 font-normal">
                          <FaCalendarAlt />
                          {item?.startEvent
                            .split('T')[0]
                            .split('-')
                            .join('/')}
                          - {item?.endEvent.split('T')[0].split('-').join('/')}
                        </h1>
                      </div>
                      <h1 className="text-black text-sm lg:text-base mt-2 font-bold">
                        {item?.eventName.length > 20 ? (
                          <h1>{item?.eventName.slice(0, 24)}...</h1>
                        ) : (
                          item?.eventName
                        )}
                      </h1>
                      <h1 className="text-xs lg:text-sm  mt-2 bottom-0 text-gray-500 font-normal">
                        Mulai dari
                      </h1>
                      <div className=" flex justify-between">
                        <h1 className="text-sm lg:text-base   bottom-0 text-orange-600 font-bold">
                          Rp{item?.minimumPrice.toLocaleString("id-ID")}
                        </h1>

                        {item?.seatAvailability > 0 ?
                          <h1 className="text-xs lg:text-sm   bottom-0 text-green-500">
                            Tiket Tersedia
                          </h1>
                          :
                          <h1 className="text-xs lg:text-sm   bottom-0 text-red-500">
                            Tiket Habis
                          </h1>
                        }
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <Link
            href={'http://localhost:3000/event/explore?page=1&category=4'}
            className="flex justify-center"
          >
            <button className="text-white border rounded-md p-2  hover:bg-white hover:text-black transition-all duration-200 ease-in-out">
              Lihat Lebih Lanjut
            </button>
          </Link>
        </div>
      </div>

      <div className="px-12 lg:px-20">
        <h1 className="text-2xl font-bold">
          Event Terbaru
          {/* <span className="pl-3 text-blue-500 font-normal text-sm">
            Lihat Semua
          </span> */}
          <div className="mt-4">
            <CarousellEvent data={queryGetDataNewest} />
          </div>
        </h1>
      </div>

      <div className="px-12 lg:px-20">
        <h1 className="text-2xl font-bold">
          Musik Terbaru
          <div className="mt-4">
            <CarousellEvent data={queryGetCategoryMusic} />
          </div>
        </h1>
      </div>

      <div className="px-8 lg:px-20 mt-8 flex justify-center">
        <Image
          src="https://tiketevent.com/assets/admin/img/banner-home/about-banner.webp"
          width={1200}
          height={800}
          alt="event organizer"
        />
      </div>
    </main>
  );
}
