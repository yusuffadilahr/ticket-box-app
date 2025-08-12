import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './../../../components/ui/carousel';
import { Card, CardContent } from './../../../components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { IoLocationSharp } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';



export default function CarousellEvent({ data }: { data: any[] }) {

    return (
        <Carousel
            className="w-full">
            <CarouselContent>
                {data?.map((item: any, index: any) => {
                    const isExpired = new Date() > new Date(item.endDate)
                    const isSoldOut = item.seatAvailable < 1;

                    return (
                        <CarouselItem key={index} className=" basis-1/2 lg:basis-1/4">
                            <div className="p-1">
                                <Card className="h-[270px] lg:h-fit pb-2 rounded-2xl">
                                    <Link href={`/event/explore/${item.id}TBX${item.startEvent.split('T')[0].split('-').join('')}`}>
                                        <CardContent className="flex items-center justify-center">
                                            <div className='w-full h-20 lg:h-44'>
                                                <Image
                                                    src={
                                                        item?.EventImages[0]?.eventImageUrl?.includes('https://')
                                                            ? item.EventImages[0].eventImageUrl
                                                            : `https://api-vi-ticketbox.gancy.my.id/api/src/public/images/${item.EventImages[0]?.eventImageUrl || 'default-image.png'}`
                                                    }
                                                    height={200}
                                                    width={200}
                                                    alt="testing"
                                                    className="w-full lg:w-full h-24 lg:h-44 object-cover rounded-t-2xl"
                                                />
                                            </div>
                                        </CardContent>
                                        <div className='text-black p-2 pt-5'>
                                            <div className='flex flex-col gap-1 lg:gap-2'>
                                                <h1 className='flex items-center gap-2 text-xs lg:text-sm text-gray-500 font-normal'>
                                                    <IoLocationSharp />{item?.location.length > 20 ? <h1>{item?.location.slice(0, 20)}...</h1> : item?.location}</h1>
                                                <h1 className='flex items-center gap-2 text-xs lg:text-sm text-gray-500 font-normal'>
                                                    <FaCalendarAlt />
                                                    {item?.startEvent.split('T')[0].split('-').join('/')} - {item?.endEvent.split('T')[0].split('-').join('/')}
                                                </h1>
                                            </div>
                                            <h1 className='text-black text-sm lg:text-base mt-2 font-bold'>{item?.eventName.length > 30 ? <h1>{item?.eventName.slice(0, 30)}...</h1> : item?.eventName}</h1>
                                            <h1 className='text-xs lg:text-sm  mt-2 bottom-0 text-gray-500 font-normal'>
                                                Mulai dari
                                            </h1>
                                            <div className=' flex flex-col lg:flex-row lg:justify-between'>
                                                <h1 className='text-sm lg:text-base   bottom-0 text-orange-600 font-bold'>
                                                    Rp{item?.minimumPrice.toLocaleString("id-ID")}
                                                </h1>
                                                {isSoldOut ?
                                                    <h1 className='text-xs lg:text-sm   bottom-0 text-green-500'>
                                                        Tiket Habis
                                                    </h1> : isExpired ? <h1 className='text-xs lg:text-sm   bottom-0 text-green-500'>
                                                        Tiket Kadaluarsa
                                                    </h1> :
                                                        <h1 className='text-xs lg:text-sm   bottom-0 text-green-500'>
                                                            Tiket Tersedia
                                                        </h1>}
                                                {/* {item?.seatAvailability > 0 ?
                                                    <h1 className='text-xs lg:text-sm   bottom-0 text-green-500'>
                                                        Tiket Tersedia
                                                    </h1>
                                                    :
                                                    <h1 className='text-xs lg:text-sm   bottom-0 text-red-500'>
                                                        Tiket Habis
                                                    </h1>
                                                } */}
                                            </div>
                                        </div>
                                    </Link>
                                </Card>
                            </div>
                        </CarouselItem>
                    )
                })}

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}