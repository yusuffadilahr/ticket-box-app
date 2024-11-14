'use client';
import {FaArrowRight, FaArrowLeft, FaStar } from 'react-icons/fa';

import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import instance from '@/utils/axiosInstance/axiosInstance';
import Link from 'next/link';
import { IoTicketOutline } from "react-icons/io5";
import authStore from '@/zustand/authstore';
// import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';


interface IParams {
    params: {
        detail: string;
    };
}

export default function EventDetail({ params }: IParams) {
    const router = useRouter()
    const { detail } = params;
    const id = detail.split('TBX')[0];
    
    
    const { data: queryDataDetailEvent } = useQuery({
        queryKey: ['get-detail-event'],
        queryFn: async () => {
            const res = await instance.get(`/event/detail/${id}`);
            // console.log(res.data.data)
            return res.data.data[0];
        },
    });
    


    const { data: queryDataReview } = useQuery({
        queryKey: ['get-event-review'],
        queryFn: async () => {
            const res = await instance.get(`/review/${id}`);
            return res.data.data;
         
        },
    });


    const [ticketQuantities, setTicketQuantities] = useState<number[]>([])
    const [pointsToDeduct, setPointsToDeduct] = useState(0);
    const [useReferralDiscount, setUseReferralDiscount] = useState(false);


    const toggleReferralDiscount = () => setUseReferralDiscount(!useReferralDiscount);

    console.log(ticketQuantities)

    const profilePoint = authStore((state: any) => state.point);
    console.log(profilePoint)
    const profileDiscount = authStore((state: any) => state.discount);

    const { mutate: handleCheckoutTickets, isPending } = useMutation({
        mutationFn: async () => {

            const ticketDetails = ticketQuantities
                .map((quantity, index) => quantity > 0 && ({
                    ticketId: queryDataDetailEvent?.tickets[index]?.id,
                    quantity,
                    price: queryDataDetailEvent?.tickets[index]?.price,
                    discount: queryDataDetailEvent?.tickets[index]?.discount,

                }))
                .filter(Boolean);

            return await instance.post(`/transaction/${id}`, {
                referralPoints: pointsToDeduct,
                ticketDetails,
                referralDiscount: useReferralDiscount ? profileDiscount : 0,

            })


        },
        onSuccess: (res) => {
            console.log(res)
            router.push(res?.data?.data?.paymentToken?.redirect_url)
            router.push(res?.data?.data?.paymentToken?.redirect_url)
        },
        onError: (err) => {
            console.log(err)
        }
    })

    useEffect(() => {
        if (queryDataDetailEvent?.tickets?.length > 0) {
            setTicketQuantities(new Array(queryDataDetailEvent.tickets.length).fill(0));
        }
    }, [queryDataDetailEvent?.tickets]);



    useEffect(() => {
        if (queryDataDetailEvent?.tickets?.length > 0) {
            setTicketQuantities(new Array(queryDataDetailEvent.tickets.length).fill(0));
        }
    }, [queryDataDetailEvent?.tickets]);



    useEffect(() => {
        if (queryDataDetailEvent?.tickets?.length > 0) {
            setTicketQuantities(new Array(queryDataDetailEvent.tickets.length).fill(0));
        }
    }, [queryDataDetailEvent?.tickets]);

    const increment = (index: number) => {
        setTicketQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            const seatAvailable = queryDataDetailEvent?.tickets[index]?.seatAvailable || 0;

            newQuantities[index] = (newQuantities[index] || 0) + 1;

            if (newQuantities[index] > seatAvailable) {
                newQuantities[index] = seatAvailable;
            }

            return newQuantities;
        });
    };

    const decrement = (index: number) => {
        setTicketQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];

            newQuantities[index] = Math.max((newQuantities[index] || 0) - 1, 0);

            return newQuantities;
        });
        setTicketQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];

            newQuantities[index] = Math.max((newQuantities[index] || 0) - 1, 0);

            return newQuantities;
        });
    };


    const totalTickets = ticketQuantities.reduce((total, qty) => total + qty, 0);
    const totalPrice = ticketQuantities.reduce((total, qty, index) => {
        const ticket = queryDataDetailEvent?.tickets[index];

        if (!ticket || qty === 0) return total; // Skip calculation if no ticket data or quantity is zero

        const ticketPrice = ticket.price ? ticket.price : 0; // Set default to 0 if price is undefined
        const ticketDiscount = ticket.discount ? ticket.discount : 0; // Set default to 0 if discount is undefined
        const discountedPrice = ticketPrice - ticketDiscount;

        return total + (qty * discountedPrice);
    }, 0);


    const rating = 4

    return (
        <main>
            <section className="pt-28 px-20 flex gap-5">
                <div className="w-2/3">
                    <Image
                        src={queryDataDetailEvent?.EventImages[0]?.eventImageUrl.includes('https://') ?
                            queryDataDetailEvent?.EventImages[0]?.eventImageUrl :
                            `http://localhost:8000/api/src/public/images/${queryDataDetailEvent?.EventImages[0]?.eventImageUrl}`
                        } alt="testing"
                        className="object-cover w-full h-auto rounded-lg drop-shadow-lg"
                        width={1000}
                        height={1000}
                    />
                </div>
                <div className="w-1/3 bg-white rounded-lg font-bold text-lg border border-gray-50 drop-shadow-lg p-7 flex flex-col">
                    <div className="flex flex-col gap-5 flex-grow">
                        <div>{queryDataDetailEvent?.eventName}</div>
                        <div className="space-y-5 mb-4">
                            <div className="flex items-center gap-2">
                                <FaCalendarAlt />
                                <div className="text-base font-normal">
                                    {queryDataDetailEvent?.startEvent.split('T')[0]} s/d{' '}
                                    {queryDataDetailEvent?.endEvent.split('T')[0]}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdOutlineAccessTimeFilled />
                                <div className="text-base font-normal">
                                    {queryDataDetailEvent?.startEvent
                                        .split('T')[1]
                                        .split('.')[0]
                                        .slice(0, -3)}{' '}
                                    s/d{' '}
                                    {queryDataDetailEvent?.endEvent
                                        .split('T')[1]
                                        .split('.')[0]
                                        .slice(0, -3)}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <IoLocationSharp />
                                <div className="text-base font-normal">
                                    <Link target='_blank' href={`${queryDataDetailEvent?.locationUrl}`}>
                                        {queryDataDetailEvent?.location}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto  border-t-2">
                        <div className="mt-4 flex items-center gap-6">
                            <Avatar>
                                <AvatarImage
                                    src={queryDataDetailEvent?.EventOrganizer?.profilePicture}
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <div className="text-gray-600 text-sm font-normal ">
                                    Diselenggarakan Oleh
                                </div>
                                <div>{queryDataDetailEvent?.EventOrganizer?.organizerName}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-10 px-20 flex gap-5">
                <Tabs defaultValue="deskripsi" className="w-2/3">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="deskripsi">Deskripsi</TabsTrigger>
                        <TabsTrigger value="tiket">Tiket</TabsTrigger>
                        <TabsTrigger value="review">Review</TabsTrigger>
                    </TabsList>
                    <TabsContent value="deskripsi">
                        <Card className="p-4">
                            <CardHeader>
                                <CardTitle className="pb-4">Deskripsi</CardTitle>
                                {/* <CardDescription>
                                    {queryDataDetailEvent?.description}
                                </CardDescription> */}
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div
                                    dangerouslySetInnerHTML={{ __html: queryDataDetailEvent?.description }}
                                    className="prose max-w-none"
                                />
                            </CardContent>

                        </Card>
                    </TabsContent>
                    <TabsContent value="tiket">
                        <Card className="p-4">
                            <CardHeader>
                                <CardTitle className="pb-4">Pilih Tiket Anda:</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {queryDataDetailEvent?.tickets?.map((item: any, index: any) => (
                                    <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-md w-full mx-auto">
                                        <div className="flex  items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    {item.ticketName}
                                                </h3>
                                                <p className="text-gray-600 mt-1">
                                                    {item.ticketType}
                                                </p>
                                                <div className="text-blue-600 mt-2">
                                                    <span className="flex items-center">
                                                        <MdOutlineAccessTimeFilled />
                                                        Ends {item.endDate.split('T')[0]} • {queryDataDetailEvent?.tickets[0].endDate.split('T')[1].split('.')[0].slice(0, -3)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="my-4 border-blue-300 border-dashed" />
                                        <div className="flex justify-between items-center">
                                            <p className="text-xl font-semibold">
{/*                                               
                                              
                                                {item.discount > 0 ? (
                                                    <div>
                                                        <span className="line-through mr-2 text-gray-500">Rp.{item.price}</span>
                                                        <span className="text-red-600">
                                                            Rp{(item.price - item.discount).toLocaleString("id-ID")}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    `Rp${item.price.toLocaleString("id-ID")}`
                                                ) } */}
                                                {
                                                item.discount > 0 ? (
                                                    <div>
                                                        <span className="line-through mr-2 text-gray-500">Rp.{item.price}</span>
                                                        <span className="text-red-600">
                                                            Rp{(item.price - item.discount).toLocaleString("id-ID")}
                                                        </span>
                                                    </div>
                                                ) : item.price == 0 ? 'Gratis'                                                    
                                                        :
                                                    (`Rp${item.price.toLocaleString("id-ID")}`)
                                                }

                                            </p>
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    onClick={() => decrement(index)}
                                                    className="text-blue-500 border border-blue-500 rounded-full w-8 h-8 flex justify-center items-center"
                                                >
                                                    –
                                                </button>
                                                <span>{ticketQuantities[index] || 0}</span>
                                                <button
                                                    onClick={() => increment(index)}
                                                    className={`text-blue-500 border border-blue-500 rounded-full w-8 h-8 flex justify-center items-center
                                                     (ticketQuantities[index] || 0) >= (item.seatAvailable || 0) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
                                                    disabled={(ticketQuantities[index] || 0) >= (item.seatAvailable || 0)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="review">
                        <Card className="p-4">
                            <CardHeader>
                                <CardTitle className="pb-4">Review</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 px-4 max-h-[400px] overflow-y-auto">
                                {queryDataReview?.dataReview?.map((item: any, index: any) => {
                                    return (
                                        <div key={index} className="w-full bg-white border border-gray-200 rounded-lg shadow py-2 px-6 dark:bg-gray-800 dark:border-gray-700">
                                            <div className="flow-root">
                                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">

                                                    <li className="py-2">

                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0">
                                                                <Avatar className=' border-blue-400 border-2 hover:border-yellow-500 transition-all duration-300'>
                                                                    <AvatarImage src={`http://localhost:8000/api/src/public/images/${item?.users.profilePicture}`} className="object-cover" alt="logo-user" />
                                                                    <AvatarFallback>CN</AvatarFallback>
                                                                </Avatar>
                                                            </div>
                                                            <div className="flex-1 min-w-0 ms-4">
                                                                <p className="text-base font-medium text-gray-900 truncate dark:text-white">
                                                                    {item?.users?.firstName}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    {item?.createdAt.split('T')[0]}
                                                                </p>

                                                            </div>
                                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                                <div className="flex items-center">

                                                                    <FaStar className='text-yellow-400 text-lg' />
                                                                    <span className='text-2xl mr-1 gap-'>{item?.rating}</span>
                                                                    <span className='text-sm text-gray-500'>/5</span>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="py-2">
                                                        <div className="flex items-center ">

                                                            <div className="flex-1 min-w-0 ms-4">
                                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                    {item?.reviewText}
                                                                </p>

                                                            </div>

                                                        </div>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                        
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                <div id="totaltickets" className="w-1/3 bg-white h-fit p-7 rounded-lg border border-gray-50 drop-shadow-lg">
                    {ticketQuantities.map((quantity, index) => {
                        const ticket = queryDataDetailEvent?.tickets[index];

                        if (quantity > 0 && ticket) {
                            const discountedPrice = ticket.discount > 0
                                // ? ticket.price * (1 - ticket.discount / 100)
                                // : ticket.price;
                                ? ticket.price - ticket.discount
                                : ticket.price;
                            const ticketSubtotal = quantity * (discountedPrice || 0);

                            return (
                                <div key={index} className="mb-2 flex flex-row gap-4 items-center justify-center">
                                    <div className='flex w-36 justify-center items-center gap-3'>
                                        <IoTicketOutline size={40} />
                                        <p className="text-sm font-semibold">{ticket.ticketName}</p>
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <p className="text-sm">x {quantity}</p>
                                        {ticket.discount > 0 ? (

                                            <p className="text-sm text-green-600">Harga Diskon: Rp{discountedPrice.toLocaleString()}</p>

                                        ) : (
                                            <p className="text-sm">Price: Rp{discountedPrice.toLocaleString("id-ID")}</p>
                                        )}
                                        <p className="text-sm">Subtotal: Rp{ticketSubtotal.toLocaleString("id-ID")}</p>
                                    </div>

                                </div>
                            );
                        }
                        return null;
                    })}

                    <div className='flex justify-between items-center border-t-2 border-gray-300'>
                        <p className="text-md mt-4 text-gray-700 ">Jumlah {totalTickets} tiket</p>
                        <p className="text-xl mt-4 font-bold"><span className='text-base text-gray-700 font-normal'>Harga:</span> Rp{totalPrice.toLocaleString("id-ID")}</p>
                    </div>

                    {
                        profilePoint > 0 && profilePoint && (
                            <div className="mt-4">
                                <label className="text-sm text-gray-700">Gunakan Poin (Max: {profilePoint}):</label>
                                <input
                                    type="number"
                                    max={profilePoint}
                                    value={pointsToDeduct}
                                    onChange={(e) => setPointsToDeduct(Math.min(profilePoint, parseInt(e.target.value) || 0))}
                                    className="w-full p-2 mt-1 rounded border border-gray-300"
                                />
                            </div>
                        )
                    }

                    {
                        profileDiscount > 0 && profileDiscount && (

                            <div className=" flex items-center mt-4">
                                <input
                                    type="checkbox"
                                    id="useReferralDiscount"
                                    checked={useReferralDiscount}
                                    onChange={toggleReferralDiscount}
                                    className="mr-2"
                                />
                                <label htmlFor="useReferralDiscount" className="text-sm font-semibold">
                                    Use Referral Discount
                                </label>
                            </div>

                        )

                    }

                    <button disabled={isPending} className='btn bg-blue-700 text-white font-bold p-2 w-full rounded-lg mt-5' onClick={() => handleCheckoutTickets()}>
                        {isPending ? 'Pembayaran Diproses' : 'Bayar Sekarang'}
                    </button>
                </div>
            </section>
        </main>
    );
}
