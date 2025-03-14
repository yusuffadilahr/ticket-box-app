'use client';

import Image from 'next/image';
import CarouselSlider from './../components/carousell';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import authStore from './../zustand/authstore';
import { CiMusicNote1 } from 'react-icons/ci';
import { PiPersonSimpleWalkThin } from 'react-icons/pi';
import { CiTrophy } from 'react-icons/ci';
import { CiMicrophoneOn } from 'react-icons/ci';
import { GiBlackBook } from 'react-icons/gi';
import Cookies from 'js-cookie';
import TopSeller from './../features/homepage/components/topSeller';
import KategoriSection from './../features/homepage/components/kategori';
import KomediSection from './../features/homepage/components/komedi';
import Terbaru from './../features/homepage/components/terbaru';
import Musik from './../features/homepage/components/musik';
import { QueryGetDataHooks } from './../features/homepage/hooks/QueryGetDataHooks';

export default function Home({
    dataTopSell,
    dataComedy,
    dataNewest
}: {
    dataTopSell: any,
    dataComedy: any
    dataNewest: any
}) {
    const router = useRouter();
    const token = authStore((state) => state.token);
    const setAuth = authStore((state) => state.setAuth);
    const role = authStore((state) => state.role);

    const {
        queryGetCategoryMusic,
        queryGetCarousel,
        isLoadingMusic
    } = QueryGetDataHooks()



    useEffect(() => {
        if (role && role == 'EO') {
            setAuth({ token: '' });
            Cookies.remove('role');
            Cookies.remove('token');
            router.push('/user/login');
        }
    }, [role, token]);

    if (isLoadingMusic) {
        return (
            <section className="w-full h-screen bg-white flex flex-col justify-center items-center">
                <div className="w-20">
                    <Image
                        width={500}
                        height={500}
                        alt="loading"
                        unoptimized
                        src={'https://assets-v2.lottiefiles.com/a/903ffa84-1150-11ee-b76b-1f284ac5ea90/ICdNKu73qS.gif'}
                        className="w-20"
                    />
                </div>
                <h1 className="text-neutral-400 text-sm mt-4">Mohon tunggu..</h1>
            </section>
        )
    }

    const categoryList = [
        {
            logo: 'CiMusicNote1',
            name: 'Musik',
            link: 'https://ticket-box-web-app.vercel.app/event/explore?page=1&category=1',
        },
        {
            logo: 'PiPersonSimpleWalkThin',
            name: 'Expo',
            link: 'https://ticket-box-web-app.vercel.app/event/explore?page=1&category=2',
        },
        {
            logo: 'CiTrophy',
            name: 'Olahraga',
            link: 'https://ticket-box-web-app.vercel.app/event/explore?page=1&category=3',
        },
        {
            logo: 'CiMicrophoneOn',
            name: 'Komedi',
            link: 'https://ticket-box-web-app.vercel.app/event/explore?page=1&category=4',
        },
        {
            logo: 'GiBlackBook',
            name: 'Seminar',
            link: 'https://ticket-box-web-app.vercel.app/event/explore?page=1&category=5',
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
            <div className="w-full sm:h-[700px] lg:h-fit sm:px-2 lg:px-20 pt-20 lg:pt-28">
                <CarouselSlider data={queryGetCarousel} />
            </div>
            <TopSeller queryGetDataTopSell={dataTopSell || []} />
            <KategoriSection categoryList={categoryList} iconComponents={iconComponents} />
            <KomediSection queryGetComedyEvent={dataComedy || []} />
            <Terbaru queryGetDataNewest={dataNewest || []} />
            <Musik queryGetCategoryMusic={queryGetCategoryMusic} />

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
