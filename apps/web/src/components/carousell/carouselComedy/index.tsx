import Link from "next/link";
import Image from "next/image";
import { IoLocationSharp } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';

export default function CarouselComedy({ queryGetComedyEvent }: any) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 text-white gap-3 lg:gap-6 px-6 lg:px-0">
            {queryGetComedyEvent?.map((item: any, index: any) => {
                return (
                    <div
                        key={index}
                        className="bg-white w-[180px] rounded-2xl lg:w-[280px] lg:h-fit pb-1"
                    >
                        <Link
                            href={`/event/explore/${item.id}TBX${item.startEvent.split('T')[0].split('-').join('')}`}
                        >
                            <div className="w-full lg:h-36">
                                <Image
                                    src={
                                        item?.EventImages[0]?.eventImageUrl?.includes('https://')
                                            ? item.EventImages[0].eventImageUrl
                                            : `https://api-vi-ticketbox.gancy.my.id/api/src/public/images/${item.EventImages[0]?.eventImageUrl || 'default-image.png'}`
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
    )
}