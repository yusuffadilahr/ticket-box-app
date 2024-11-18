'use client';

import { useState, useEffect } from 'react';
import authStore from './../../../../zustand/authstore';
import { useRouter } from 'next/navigation';
import DetailEvent from './../../../../features/event/components/detailEvent/';
import PembayaranTiket from './../../../../features/event/components/pembayaranTiket';
import InfoEvent from './../../../../features/event/components/infoEvent';
import EventImage from './../../../../features/event/components/eventImage';
import { QueryGetEventDetailHooks } from './../../../../features/event/hooks/QueryGetEventDetailHooks';
import { MutateHandleCheckoutTicketsHook } from './../../../../features/event/hooks/MutateHandleCheckoutTicketsHook';

interface IParams {
    params: {
        detail: string;
    };
}




export default function EventDetail({ params }: IParams) {
    const router = useRouter()
    const { detail } = params;
    const id = detail.split('TBX')[0];

    const [ticketQuantities, setTicketQuantities] = useState<number[]>([])
    const [pointsToDeduct, setPointsToDeduct] = useState(0);
    const [useReferralDiscount, setUseReferralDiscount] = useState(false);
    const toggleReferralDiscount = () => setUseReferralDiscount(!useReferralDiscount);
    const profilePoint = authStore((state: any) => state.point);
    const profileDiscount = authStore((state: any) => state.discount);
    const {
        queryDataDetailEvent,
        queryDataReview
    } = QueryGetEventDetailHooks({ id })

    const {
        handleCheckoutTickets,
        isPending
    } = MutateHandleCheckoutTicketsHook({ id, router, profileDiscount, useReferralDiscount, pointsToDeduct, queryDataDetailEvent, ticketQuantities })


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
