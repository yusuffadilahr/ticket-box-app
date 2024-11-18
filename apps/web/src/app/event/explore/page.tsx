'use client';

import { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import instance from '@/utils/axiosInstance/axiosInstance';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SearchFilterEvent from '@/components/explore/searchInputFilter';
import CategoryFilter from '@/components/explore/categoryFilter';
import PriceFilter from '@/components/explore/priceFilter';
import DateFilter from '@/components/explore/dateFilter';
import LocationFilter from '@/components/explore/locationFilter';
import CardEvent from '@/components/explore/cardEvent';

export default function Explore({ searchParams }: { searchParams: any }) {


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
                    category: selectedCategory,
                    minPrice: minPrice ?? 0,
                    maxPrice: maxPrice ?? 999999999,
                    location: location,
                    dateFrom: dateFrom ?? '',
                    dateUntil: dateUntil ?? '',
                },
            });
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
                    <SearchFilterEvent
                        debounce={debounce}
                    />
                    <div>
                        <Accordion type="multiple" defaultValue={window.innerWidth < 768 ? [] : ["item-1", "item-2", "item-3", "item-4"]} className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Tipe Event</AccordionTrigger>
                                <CategoryFilter
                                    queryGetCategory={queryGetCategory}
                                    setSelectedCategory={setSelectedCategory}
                                />
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Harga</AccordionTrigger>
                                <PriceFilter
                                    minPrice={minPrice}
                                    setMinPrice={setMinPrice}
                                    setMaxPrice={setMaxPrice}
                                    maxPrice={maxPrice}
                                />
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Tanggal</AccordionTrigger>
                                <DateFilter
                                    dateFrom={dateFrom}
                                    dateUntil={dateUntil}
                                    setDateUntil={setDateUntil}
                                    setDateFrom={setDateFrom}

                                />
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>Lokasi</AccordionTrigger>
                                <LocationFilter
                                    setLocation={setLocation}
                                />
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </section>

            <div className="flex flex-col pt-10 lg:pt-0">
                <section className="w-full lg:w-fit ">
                    <CardEvent
                        querySearchData={querySearchData}
                    />
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
