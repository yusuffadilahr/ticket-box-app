'use client';

import { useEffect, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { IoLocationSharp } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import instance from '@/utils/axiosInstance/axiosInstance';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


export default function Explore({ searchParams }: { searchParams: any }) {
    const categoryEvent = [
        { id: 1, category: "Musik" },
        "Expo", "Olahraga", "Komedi", "Seminar"]


    const params = useSearchParams();
    const [searchInput, setSearchInput] = useState(params.get('search') || '');
    const [limitData, setLimitData] = useState(8);
    const [page, setPage] = useState(Number(params.get('page')) || 1);
    const [selectedCategory, setSelectedCategory] = useState(params.get('category') ? Number(params.get('category')) : null);
    const [minPrice, setMinPrice] = useState(params.get('minPrice') ? Number(params.get('minPrice')) : null);
    const [maxPrice, setMaxPrice] = useState(params.get('maxPrice') ? Number(params.get('maxPrice')) : null);
    const [dateFrom, setDateFrom] = useState(params.get('dateFrom') || null);
    const [dateUntil, setDateUntil] = useState(params.get('dateUntil') || null);
    const [location, setLocation] = useState(params.get('location') || '');



    const router = useRouter();
    // const paramsUrl = new URLSearchParams(params);
    const pathname = usePathname();

    const { data: queryGetCategory } = useQuery({
        queryKey: ['get-event-data-carousel'],
        queryFn: async () => {
            const res = await instance.get('/category', {
            });
            console.log(res, "<<<<<<<<<<<<<>>>>>>>")
            return res.data.data;
        },
    });

    const { data: querySearchData } = useQuery({
        queryKey: ['search-data', searchInput, page, selectedCategory, minPrice, maxPrice, location, dateFrom, dateUntil],
        queryFn: async () => {
            const res = await instance.get('/event/search', {
                params: {
                    event: searchInput,
                    page: page,
                    limit_data: limitData,
                    // category: searchParams.category || selectedCategory,
                    category: selectedCategory,
                    minPrice: minPrice ?? 0,
                    maxPrice: maxPrice ?? 999999999,
                    location: location,
                    dateFrom: dateFrom ?? '',
                    dateUntil: dateUntil ?? '',
                },
            });
            console.log(res.data.data, '<><><><><><>')
            return res.data.data
        }
    });

    const debounce = useDebouncedCallback((values) => {
        setSearchInput(values);
        setPage(1);
    }, 500);


    useEffect(() => {
        const currentUrl = new URLSearchParams(searchParams);
        currentUrl.set(`page`, page.toString())
        if (searchInput) {
            currentUrl.set(`search`, searchInput)
        } else {
            currentUrl.delete(`search`)
        }

        if (selectedCategory) {
            currentUrl.set(`category`, selectedCategory?.toString())
        } else {
            currentUrl.delete(`category`)
        }

        if (minPrice) {
            currentUrl.set(`minPrice`, minPrice?.toString())
        } else {
            currentUrl.delete(`minPrice`)
        }

        if (maxPrice) {
            currentUrl.set(`maxPrice`, maxPrice?.toString())
        } else {
            currentUrl.delete(`maxPrice`)
        }

        if (dateFrom) {
            currentUrl.set(`dateFrom`, dateFrom?.toString())
        } else {
            currentUrl.delete(`dateFrom`)
        }

        if (dateUntil) {
            currentUrl.set(`dateUntil`, dateUntil?.toString())
        } else {
            currentUrl.delete(`dateUntil`)
        }

        if (location) {
            currentUrl.set(`location`, location)
        } else {
            currentUrl.delete(`location`)
        }



        router.push(`${pathname}?${currentUrl.toString()}`)
    }, [page, searchInput, selectedCategory, minPrice, maxPrice, dateFrom, dateUntil, location])
   


    return (
        <main className="pt-12 lg:pt-28 lg:px-20 flex flex-col lg:flex-row gap-5">
            <section id="filter" className="w-full lg:w-1/5 bg-white rounded-lg border border-gray-50 drop-shadow-lg p-4 h-fit lg:sticky top-24">
                <div className="flex flex-col justify-center font-bold text-xl">
                    <div className="flex justify-center">Filter</div>
                    <button
                        onClick={() => {
                            setSelectedCategory(null),
                                setMinPrice(null),
                                setMaxPrice(null),
                                setDateFrom(null),
                                setDateUntil(null),
                                setLocation(''),
                                setSearchInput('');
                        }}
                        className="text-base font-normal text-blue-600 onClick:font-bold transision-all duration-300 ease-in-out"
                    >
                        Reset Filter
                    </button>
                    <div className="relative flex justify-end py-5">
                        <input
                            type="text"
                            // value={searchInput}
                            onChange={(e) => debounce(e.target.value)}
                            placeholder="Search..."
                            className="border px-4 py-2 pr-10 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />

                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <FaMagnifyingGlass />
                        </div>
                    </div>
                    <div>
                        <Accordion type="multiple" defaultValue={window.innerWidth < 768 ? [] : ["item-1", "item-2", "item-3", "item-4"]} className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Tipe Event</AccordionTrigger>
                                <AccordionContent>
                                    {
                                        queryGetCategory?.map((item: any, index: any) => {
                                            return (
                                                <div key={index} className="flex flex-col space-y-2 mt-2">
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            name="category"
                                                            value={item.id}
                                                            onChange={(e) =>
                                                                setSelectedCategory(parseInt(e.target.value))
                                                            }
                                                            className="form-radio text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span className='font-normal'>{item.Category}</span>
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Harga</AccordionTrigger>
                                <AccordionContent className="flex flex-col items-start gap-2">
                                    <div>
                                        <div className="flex space-x-2 mt-2">
                                            <input
                                                type="number"
                                                name="minPrice"
                                                value={minPrice ?? ''}
                                                placeholder="Min"
                                                className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                                onChange={(e) =>
                                                    setMinPrice(parseInt(e.target.value))
                                                }
                                            />
                                            <input
                                                type="number"
                                                name="maxPrice"
                                                value={maxPrice ?? ''}
                                                placeholder="Max"
                                                className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                                onChange={(e) =>
                                                    setMaxPrice(parseInt(e.target.value))
                                                }
                                            />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Tanggal</AccordionTrigger>
                                <AccordionContent>
                                    <div>
                                        <div className="flex flex-col gap-3">
                                            <label className="flex flex-col">
                                                <span className="text-sm text-gray-500">
                                                    Start Date
                                                </span>
                                                <input
                                                    type="date"
                                                    name="startDate"
                                                    value={dateFrom ?? ''}
                                                    onChange={(e) => setDateFrom(e.target.value)}
                                                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                                />
                                            </label>
                                            <label className="flex flex-col">
                                                <span className="text-sm text-gray-500">End Date</span>
                                                <input
                                                    type="date"
                                                    name="endDate"
                                                    value={dateUntil ?? ''}
                                                    onChange={(e) => setDateUntil(e.target.value)}
                                                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>Lokasi</AccordionTrigger>
                                <AccordionContent>
                                    <input
                                        type="text"
                                        name="location"
                                        value={location}
                                        placeholder="Lokasi"
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </section>

            <div className="flex flex-col pt-10 lg:pt-0">
                <section className="w-full lg:w-fit ">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {
                            querySearchData?.eventSearch?.map((item: any, index: any) => (
                                <Card key={index} className="h-[260px] lg:h-fit pb-4">
                                    <Link
                                        href={`/event/explore/${item.id}TBX${item.startEvent.split('T')[0].split('-').join('')}-${item.eventName.toLowerCase().split(' ').join('-')}`}
                                    >
                                        <CardContent className="flex items-center justify-center w-full h-full rounded-2xl">
                                            <div className="bg-white w-full lg:w-full lg:h-full rounded-2xl">
                                                <div className="w-full  lg:h-32">
                                                    <Image
                                                        src={item?.EventImages[0]?.eventImageUrl?.includes('https://')
                                                            ? item.EventImages[0].eventImageUrl
                                                            : `http://localhost:8000/api/src/public/images/${item.EventImages[0]?.eventImageUrl || 'default-image.png'}`}
                                                        height={142}
                                                        width={142}
                                                        alt="Event Image"
                                                        className="w-full  lg:h-32 object-cover rounded-t-2xl"
                                                    />
                                                </div>
                                                <div className="text-black p-3 pt-5">
                                                    <div className="flex flex-col gap-2">
                                                        <h1 className="flex items-center gap-2 text-xs lg:text-sm text-gray-500">
                                                            <IoLocationSharp />
                                                            {item?.location.length > 23 ? <h1>{item?.location.slice(0, 23)}...</h1> : item?.location}
                                                        </h1>
                                                        <h1 className="flex items-center gap-2 text-xs lg:text-sm text-gray-500 font-normal">
                                                            <FaCalendarAlt />
                                                            {item?.startEvent.split('T')[0].split('-').join('/')} - {item?.endEvent.split('T')[0].split('-').join('/')}
                                                        </h1>
                                                    </div>
                                                    {item?.eventName.length > 20 ? (
                                                        <h1 className="text-black text-xs lg:text-base mt-2 font-bold">
                                                            {item?.eventName.slice(0, 23)}..
                                                        </h1>
                                                    ) : (
                                                        <h1 className="text-black text-sm lg:text-base mt-2 font-bold">
                                                            {item?.eventName}
                                                        </h1>
                                                    )}
                                                    <h1 className="text-xs lg:text-sm mt-2 bottom-0 text-gray-500 font-normal">
                                                        Mulai dari
                                                    </h1>
                                                    <div className="flex justify-between">
                                                        <h1 className="text-sm lg:text-base bottom-0 text-orange-600 font-bold">
                                                            Rp{item?.minimumPrice.toLocaleString("id-ID")}
                                                        </h1>
                                                        {item?.seatAvailability > 0 ?
                                                            <h1 className="text-xs lg:text-sm bottom-0 text-green-500">
                                                                Tiket Tersedia
                                                            </h1>
                                                            :
                                                            <h1 className="text-xs lg:text-sm bottom-0 text-red-500">
                                                                Tiket Habis
                                                            </h1>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                            ))
                        }
                    </div>
                </section>
                <section className="flex justify-center mt-6">
                    {querySearchData?.eventSearch.length > 0 ?
                        Array(querySearchData?.totalPage).fill(0).map((item, index) => {
                            return (
                                <button
                                    key={index}
                                    className="join-item btn btn-sm mx-2 border rounded-lg w-10 h-10 hover:bg-slate-400  hover:font-bold transition-all active:bg-yellow-500  focus:ring focus:bg-blue-950 focus:text-white duration-300 ease-in-out "
                                    onClick={() => setPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            );
                        })
                        : "Data Tidak Ditemukan"}
                </section>
            </div>
        </main>
    );
}
