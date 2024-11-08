import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'

export default function CarouselSlider({ data }: { data: any }) {
    return (
        <Carousel
            className="w-full rounded-xl">
            <CarouselContent>
                {data?.map((item: any, index: any) => (
                    <CarouselItem key={index}>
                        <div className="rounded-xl">
                            <Card className='h-[200px] lg:h-[400px] rounded-xl'>
                                <CardContent className="flex items-center justify-center rounded-xl">
                                    <Image
                                        src={item?.eventImageUrl}
                                        width={500}
                                        height={800}
                                        alt='Logo'
                                        className='w-full object-cover object-center rounded-xl'
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="hidden lg:block">
                <CarouselPrevious />
                <CarouselNext />
            </div>
        </Carousel>
    )
}