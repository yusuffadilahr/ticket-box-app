'use client'

import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";
import { useMutation } from "@tanstack/react-query";
import instance from "@/utils/axiosInstance/axiosInstance";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";


export default function Explore() {
    const [dataEvent, setDataEvent] = useState([])
    const [searchInput, setSearchInput] = useState<string>('')
    const [limitData, setLimitData] = useState(8)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [dateFrom, setDateFrom] = useState<string | null>(null);
    const [dateUntil, setDateUntil] = useState<string | null>(null);
    const [location, setLocation] = useState<string>('');

    const router = useRouter()
    const params = useSearchParams()
    const paramsUrl = new URLSearchParams(params)

    // console.log(searchParams)

    const { mutate: mutateSearchData } = useMutation({
        mutationFn: async (values: string) => {
            const res = await instance.get('/event/search', {
                params: {
                    event: values,
                    page: page,
                    limit_data: limitData,
                    category: selectedCategory,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    location: location,
                    dateFrom: dateFrom,
                    dateUntil: dateUntil
                }
            })

            return res.data.data
        },
        onSuccess: (res) => {
            console.log(res);
            setDataEvent(res);
        },
        onError: (err: any) => {
            toast.error(err.response.data.message)
            console.log(err)
        }
    })
    // http://localhost:3000/event/explore?
    // axios.get('/event?search=event%202&')


    const debounce = useDebouncedCallback((values) => {
        if (values) {
            let currentUrl = '?'

            paramsUrl.set('search', values)
            for (let [key, value] of paramsUrl) {
                currentUrl += `${key}=${value}&`
            }

            router.push(currentUrl)
            router.refresh()
            setSearchInput(values)
            setPage(1)
        }
    }, 500)

    // const onCategoryEvent = (value) => {
    //     let currentUrl = '?'

    //     paramsUrl.set('category', value)
    //     for (let [key, value] of paramsUrl) {
    //         currentUrl += `${key}=${value}&`
    //     }

    //     if (currentUrl[currentUrl.length - 1] === '&') currentUrl = currentUrl.slice(0, currentUrl.length - 1)

    //     router.push(currentUrl)
    //     router.refresh()
    // }


    // const onStartPriceEvent = (value) => {
    //     let currentUrl = '?'

    //     paramsUrl.set('startPrice', value)
    //     for (let [key, value] of paramsUrl) {
    //         currentUrl += `${key}=${value}&`
    //     }

    //     if (currentUrl[currentUrl.length - 1] === '&') currentUrl = currentUrl.slice(0, currentUrl.length - 1)

    //     router.push(currentUrl)
    //     router.refresh()
    // }

    // const onEndPriceEvent = (value) => {
    //     let currentUrl = '?'

    //     paramsUrl.set('endPrice', value)
    //     for (let [key, value] of paramsUrl) {
    //         currentUrl += `${key}=${value}&`
    //     }

    //     if (currentUrl[currentUrl.length - 1] === '&') currentUrl = currentUrl.slice(0, currentUrl.length - 1)

    //     router.push(currentUrl)
    //     router.refresh()
    // }


    // const onStartDateEvent = (value) => {
    //     let currentUrl = '?'

    //     // http://8000/event/search??startDate=value
    //     paramsUrl.set('startDate', value)
    //     for (let [key, value] of paramsUrl) {
    //         currentUrl += `${key}=${value}&`
    //     }

    //     if (currentUrl[currentUrl.length - 1] === '&') currentUrl = currentUrl.slice(0, currentUrl.length - 1)

    //     router.push(currentUrl)
    //     router.refresh()
    // }

    // const onCEndDateEvent = (value) => {
    //     let currentUrl = '?'

    //     paramsUrl.set('endDate', value)
    //     for (let [key, value] of paramsUrl) {
    //         currentUrl += `${key}=${value}&`
    //     }

    //     if (currentUrl[currentUrl.length - 1] === '&') currentUrl = currentUrl.slice(0, currentUrl.length - 1)

    //     router.push(currentUrl)
    //     router.refresh()
    // }

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 3000)
    // }, [])


    useEffect(() => {
        mutateSearchData(searchInput)
    }, [searchInput, page, selectedCategory, minPrice, maxPrice, location, dateFrom, dateUntil])

    // if (loading == true) return (
    //     <section className="w-full h-screen bg-white flex flex-col justify-center items-center">
    //         <div className="w-20">
    //             <Image
    //                 width={500}
    //                 height={500}
    //                 alt="loading"
    //                 src={'https://assets-v2.lottiefiles.com/a/903ffa84-1150-11ee-b76b-1f284ac5ea90/ICdNKu73qS.gif'}
    //                 className="w-20"
    //             />
    //         </div>
    //         <h1 className="text-neutral-400 text-sm mt-4">Mohon tunggu..</h1>
    //     </section>
    // )


    return (

        <main className="pt-28 px-20 flex gap-5">
            <section className="w-1/4 bg-white rounded-lg border border-gray-50 drop-shadow-lg p-4 h-fit">
                <div className="flex flex-col justify-center font-bold text-xl">
                    <div className="flex justify-center">Filter</div>
                    <button onClick={() => {
                        setSelectedCategory(null),
                            setMinPrice(null),
                            setMaxPrice(null),
                            setDateFrom(null),
                            setDateUntil(null),
                            setLocation(''),
                            setSearchInput('')

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
                        <Accordion type="multiple" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Tipe Event</AccordionTrigger>
                                <AccordionContent>
                                    <div>
                                        <div className="flex flex-col space-y-2 mt-2">
                                            <label className="flex items-center space-x-2">
                                                <input type="radio" name="category" value={1} onChange={(e) => setSelectedCategory(parseInt(e.target.value))} className="form-radio text-blue-600 focus:ring-blue-500" />
                                                <span>Music</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="radio" name="category" value={2} onChange={(e) => setSelectedCategory(parseInt(e.target.value))} className="form-radio text-blue-600 focus:ring-blue-500" />
                                                <span>Sports</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="radio" name="category" value={6} onChange={(e) => setSelectedCategory(parseInt(e.target.value))} className="form-radio text-blue-600 focus:ring-blue-500" />
                                                <span>Art</span>
                                            </label>
                                        </div>
                                    </div>
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
                                                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                                            />
                                            <input
                                                type="number"
                                                name="maxPrice"
                                                value={maxPrice ?? ''}
                                                placeholder="Max"
                                                className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                                onChange={(e) => setMaxPrice(parseInt(e.target.value))}

                                            />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Tanggal</AccordionTrigger>
                                <AccordionContent>
                                    <div>
                                        <div className="flex space-x-2 mt-2">
                                            <label className="flex flex-col">
                                                <span className="text-sm text-gray-500">Start Date</span>
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
                                        className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                        onChange={(e) => setLocation(e.target.value)}

                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                    </div>
                </div>
            </section>



            <div className="flex flex-col">
                <section className="w-fit ">
                    <div className="grid grid-cols-4 gap-4">
                        {
                            dataEvent?.eventSearch?.map((item: any, index: any) => {
                                return (
                                    <Card key={index} className='h-[200px] lg:h-fit pb-4'>
                                        <Link href={`/event/explore/${item.id}TBX${item.startEvent.split('T')[0].split('-').join('')} ${item.eventName.toLowerCase()}`}>
                                            <CardContent className="flex items-center justify-center w-full h-full rounded-2xl">
                                                <div className="bg-white w-[180px] lg:w-full lg:h-full rounded-2xl">
                                                    <div className='w-full lg:h-60'>
                                                        <Image
                                                            src="https://staticassets.kiostix.com/16e68af4-9ee9-4027-b8a0-7547c6d79adf_1722263376463.png"
                                                            height={142}
                                                            width={142}
                                                            alt="testing"
                                                            className="w-full lg:h-60 object-cover rounded-t-2xl"
                                                        />
                                                    </div>
                                                    <div className='text-black p-3 pt-5'>
                                                        <div className='flex flex-col gap-2'>
                                                            <h1 className='flex items-center gap-2 text-xs lg:text-sm text-gray-500'>
                                                                <IoLocationSharp />{item?.location}</h1>
                                                            <h1 className='flex items-center gap-2 text-xs lg:text-sm text-gray-500 font-normal'>
                                                                <FaCalendarAlt />
                                                                {item?.startEvent.split('T')[0].split('-').join('/')} - {item?.endEvent.split('T')[0].split('-').join('/')}
                                                            </h1>
                                                        </div>
                                                        <h1 className='text-black text-sm lg:text-lg mt-2 font-bold'>{item?.eventName}</h1>
                                                        <h1 className='text-xs lg:text-sm  mt-2 bottom-0 text-gray-500 font-normal'>Mulai dari </h1>
                                                        <div className=' flex justify-between'>
                                                            <h1 className='text-sm lg:text-base   bottom-0 text-orange-600 font-bold'> RP. {item?.tickets[0]?.price}</h1>
                                                            <h1 className='text-xs lg:text-sm   bottom-0 text-green-500'> Tiket Tersedia</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Link>
                                    </Card>

                                )
                            })
                        }
                    </div>
                </section>
                <section className="flex justify-center mt-6">
                    {
                        Array(dataEvent?.totalPage).fill(0).map((item, index) => {
                            return (
                                <button key={index} className='join-item btn btn-sm mx-2 border rounded-lg w-10 h-10 hover:bg-slate-400  hover:font-bold transition-all active:bg-yellow-500  focus:ring focus:bg-blue-950 focus:text-white duration-300 ease-in-out ' onClick={() => setPage(index + 1)}>{index + 1}</button>
                            )
                        })
                    }
                </section>
            </div >
        </main >
    )
}