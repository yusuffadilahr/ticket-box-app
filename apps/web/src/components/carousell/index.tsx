import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./../../components/ui/carousel"
import { Card, CardContent } from "./../../components/ui/card"
import Image from 'next/image'
import EmblaCarousel from 'embla-carousel';
import { EmblaCarouselType } from 'embla-carousel';
import { useEffect, useRef } from 'react';
import Autoplay from "embla-carousel-autoplay"



export default function CarouselSlider({ data }: { data: any }) {
    const emblaRef = useRef<HTMLDivElement>(null);
    const emblaInstance = useRef<EmblaCarouselType | null>(null); 

    useEffect(() => {
        if (emblaRef.current && !emblaInstance.current) {
            emblaInstance.current = EmblaCarousel(emblaRef.current, {
                loop: true,
            }, [
                Autoplay({
                    delay: 2000,
                }),
            ]);
        }

        return () => {
            if (emblaInstance.current) {
                emblaInstance.current.destroy();
                emblaInstance.current = null;
            }
        };
    }, []);

    
    
    
    
    return (
        <Carousel
            className="w-full rounded-xl"
            ref={emblaRef}
        >
            <CarouselContent>
                {data?.map((item: any, index: any) => (
                    <CarouselItem key={index}>
                        <div className="rounded-xl">
                            <Card className='h-[200px] lg:h-[300px] rounded-xl'>
                                <CardContent className="flex items-center justify-center rounded-xl">
                                    <Image
                                        src={item?.eventImageUrl}
                                        width={1000}
                                        height={800}
                                        alt='Logo'
                                        className='w-full h-[300px] object-cover object-center rounded-xl'
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