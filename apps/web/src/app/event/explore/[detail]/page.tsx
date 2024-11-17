'use client';
import { FaArrowRight, FaArrowLeft, FaStar } from 'react-icons/fa';

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
import { divide } from 'cypress/types/lodash';
import TabDeskripsi from '@/components/eventDetails/tabDeskripsi';
import TabTiket from '@/components/eventDetails/tabTiket';
import TabReview from '@/components/eventDetails/tabReview';
import EventInfo from '@/components/eventDetails/eventInfo';
import EventOrganizerInfo from '@/components/eventDetails/eventOrganizerInfo';
import TotalPayment from '@/components/eventDetails/totalPayment';
import PointReferralDiscount from '@/components/eventDetails/pointReferralDiscount';
import DetailEvent from '@/features/event/components/detailEvent';
import PembayaranTiket from '@/features/event/components/pembayaranTiket';
import InfoEvent from '@/features/event/components/infoEvent';
import EventImage from '@/features/event/components/eventImage';


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

    console.log(ticketQuantities?.reduce((acc, curr) => acc + curr, 0) == 0, '..,,,,,,,,,,,,,,,,,')

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

            if (!ticketDetails) throw { msg: "harap masukkan tiket" }

            return await instance.post(`/transaction/${id}`, {
                referralPoints: pointsToDeduct,
                ticketDetails,
                referralDiscount: useReferralDiscount ? profileDiscount : 0,
            })
        },
        onSuccess: (res) => {
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

        if (!ticket || qty === 0) return total; 

        const ticketPrice = ticket.price ? ticket.price : 0; 
        const ticketDiscount = ticket.discount ? ticket.discount : 0;
        const discountedPrice = ticketPrice - ticketDiscount;

        return total + (qty * discountedPrice);
    }, 0);


    return (
        <main>
            <section className="pt-14 lg:pt-28 lg:px-20 flex gap-2 lg:gap-5 flex-col lg:flex-row">
                <EventImage
                    queryDataDetailEvent={queryDataDetailEvent}
                />
                <InfoEvent
                    queryDataDetailEvent={queryDataDetailEvent}
                />
            </section>
            <section className="pt-10 lg:px-20 flex flex-col lg:flex-row gap-5">
                <DetailEvent
                    queryDataReview={queryDataReview}
                    increment={increment}
                    decrement={decrement}
                    ticketQuantities={ticketQuantities}
                    queryDataDetailEvent={queryDataDetailEvent}
                />
                <PembayaranTiket
                    isPending={isPending}
                    setPointsToDeduct={setPointsToDeduct}
                    pointsToDeduct={pointsToDeduct }
                    profilePoint={profilePoint }
                    toggleReferralDiscount={toggleReferralDiscount}
                    useReferralDiscount={useReferralDiscount}
                    profileDiscount={profileDiscount}
                    totalTickets={totalTickets}
                    queryDataDetailEvent={queryDataDetailEvent }
                    ticketQuantities={ticketQuantities }
                    totalPrice={totalPrice }
                    handleCheckoutTickets={handleCheckoutTickets}
                
                />
            </section>
        </main>
    );
}
