import Image from "next/image"
import { Card,CardContent } from "../ui/card"
import Link from "next/link"
import { IoLocationSharp } from "react-icons/io5"
import { FaCalendarAlt } from "react-icons/fa"

export default function CardEvent({ querySearchData }:any) {
    return (
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
    )
}