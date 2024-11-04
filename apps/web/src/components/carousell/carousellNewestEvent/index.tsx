import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { IoLocationSharp } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';

export default function CarousellNewestEvent({ queryGetDataNewest }: { queryGetDataNewest: any[] }) {
    return (
        <Carousel className="w-full ">
            <CarouselContent>
                {queryGetDataNewest?.map((item: any, index: any) => (
                    <CarouselItem key={index} className=" basis-1/2 lg:basis-1/4">
                        <div className="p-1">
                            <Card className="h-[250px] lg:h-fit pb-2 rounded-2xl">
                                <Link href={`/event/explore/${item.id}TBX${item.startEvent.split('T')[0].split('-').join('')} ${item.eventName.toLowerCase()}`}>
                                    <CardContent className="flex items-center justify-center">
                                        <div className='w-full lg:h-72'>
                                            <Image
                                                src="https://staticassets.kiostix.com/16e68af4-9ee9-4027-b8a0-7547c6d79adf_1722263376463.png"
                                                height={142}
                                                width={142}
                                                alt="testing"
                                                className="w-full lg:h-72 object-cover rounded-t-2xl"
                                            />
                                        </div>
                                    </CardContent>
                                    <div className='text-black p-2 pt-5'>
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
                                </Link>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}