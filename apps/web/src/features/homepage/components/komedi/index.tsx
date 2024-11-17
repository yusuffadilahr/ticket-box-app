import Image from "next/image"
import Link from "next/link"
import CarouselComedy from "@/components/carousell/carouselComedy"

export default function KomediSection({ queryGetComedyEvent, waras }:any) {
    return (
        <div className="relative w-full  flex justify-center items-center">
            <div className="w-full px-2 lg:px-20 h-[900px] lg:h-[700px] ">
                <Image
                    src={waras}
                    height={800}
                    width={1200}
                    alt="comedy"
                    className="object-cover rounded-3xl flex w-full h-[900px] lg:h-[700px]"
                />
            </div>

            <div className="absolute space-y-12">
                <div className="text-lg lg:text-2xl font-bold text-white p-2 flex justify-center">
                    Lepasin stres, mari ketawa bareng!
                </div>
                <CarouselComedy
                    queryGetComedyEvent={queryGetComedyEvent}
                />
                <Link
                    href={'http://localhost:3000/event/explore?page=1&category=4'}
                    className="flex justify-center"
                >
                    <button className="text-white border rounded-md p-2  hover:bg-white hover:text-black transition-all duration-200 ease-in-out">
                        Lihat Lebih Lanjut
                    </button>
                </Link>
            </div>
        </div>
    )
}