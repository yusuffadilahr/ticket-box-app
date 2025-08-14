import Link from "next/link";
import Image from "next/image";
import { IoLocationSharp } from 'react-icons/io5';
import { FaCalendarAlt, FaTicketAlt } from 'react-icons/fa';
import { BsStarFill } from 'react-icons/bs';

export default function CarouselComedy({ data }: { data: any }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 px-4 lg:px-0">
            {data?.map((item: any, index: number) => {
                return (
                    <div
                        key={index}
                        className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 w-full max-w-[200px] lg:max-w-[300px] mx-auto"
                    >
                        <Link
                            href={`/event/explore/${item?.id}TBX${item?.startEvent?.split('T')[0].split('-').join('')}`}>
                            <div className="relative w-full h-32 lg:h-44 overflow-hidden">
                                <Image
                                    src={
                                        item?.EventImages?.[0]?.eventImageUrl?.includes('https://')
                                            ? item?.EventImages?.[0]?.eventImageUrl
                                            : `https://api-vi-ticketbox.gancy.my.id/api/src/public/images/${item?.EventImages?.[0]?.eventImageUrl || 'default-image.png'}`
                                    }
                                    height={176}
                                    width={300}
                                    alt={item?.eventName || "Event"}
                                    className="w-full rounded-t-xl h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Availability Badge */}
                                <div className="absolute top-3 right-3">
                                    <div className={`px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${item?.seatAvailability > 0
                                        ? 'bg-green-500/90 text-white'
                                        : 'bg-red-500/90 text-white'
                                        }`}>
                                        {item?.seatAvailability > 0 ? 'Available' : 'Sold Out'}
                                    </div>
                                </div>

                                {/* Favorite Icon */}
                                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <BsStarFill className="text-yellow-400 text-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 lg:p-5 space-y-3">
                                {/* Location and Date */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-500">
                                        <IoLocationSharp className="text-red-500 flex-shrink-0" />
                                        <span className="truncate">
                                            {item?.location?.length > 18
                                                ? `${item?.location?.slice(0, 18)}...`
                                                : item?.location
                                            }
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-500">
                                        <FaCalendarAlt className="text-blue-500 flex-shrink-0" />
                                        <span className="truncate">
                                            {item?.startEvent?.split('T')[0].split('-').join('/')}
                                        </span>
                                    </div>
                                </div>

                                {/* Event Name */}
                                <h2 className="text-gray-900 text-sm lg:text-base font-bold leading-tight line-clamp-2 group-hover:text-black transition-colors duration-300">
                                    {item?.eventName}
                                </h2>

                                {/* Price Section */}
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 font-medium">
                                        Mulai dari
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <span className="text-lg lg:text-xl font-bold text-orange-600">
                                                Rp{item?.minimumPrice?.toLocaleString("id-ID")}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <FaTicketAlt className={`text-xs ${item?.seatAvailability > 0
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                                }`} />
                                            <span className={`text-xs lg:text-sm font-medium ${item?.seatAvailability > 0
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                                }`}>
                                                {item?.seatAvailability > 0 ? 'Tersedia' : 'Habis'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover CTA */}
                                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="w-full py-2 bg-slate-800 text-white text-center rounded-xl text-sm font-semibold">
                                        Beli Tiket Sekarang
                                    </div>
                                </div>
                            </div>

                            {/* Card border animation */}
                            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-slate-300 transition-colors duration-300" />

                            {/* Shine effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute -top-full left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    )
}