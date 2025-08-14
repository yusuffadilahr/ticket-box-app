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
import { useEffect, useRef, useState } from 'react';
import Autoplay from "embla-carousel-autoplay"

export default function CarouselSlider({ data }: { data: any }) {
    const emblaRef = useRef<HTMLDivElement>(null);
    const emblaInstance = useRef<EmblaCarouselType | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (emblaRef.current && !emblaInstance.current) {
            emblaInstance.current = EmblaCarousel(emblaRef.current, {
                loop: true,
                align: 'center',
            }, [
                Autoplay({
                    delay: 4000,
                    stopOnInteraction: false,
                }),
            ]);

            // Update selected index when slide changes
            emblaInstance.current.on('select', () => {
                if (emblaInstance.current) {
                    setSelectedIndex(emblaInstance.current.selectedScrollSnap());
                }
            });
        }

        return () => {
            if (emblaInstance.current) {
                emblaInstance.current.destroy();
                emblaInstance.current = null;
            }
        };
    }, []);

    return (
        <div className="relative group">
            <Carousel
                className="w-full px-2 md:px-0"
                ref={emblaRef}
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {data?.map((item: any, index: number) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
                                <Card className='h-[250px] md:h-[350px] lg:h-[500px] border-0 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden'>
                                    <CardContent className="relative p-0 h-full">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                                        <div className="relative h-full overflow-hidden">
                                            <Image
                                                src={item?.eventImageUrl}
                                                width={1200}
                                                height={800}
                                                alt={`Event ${index + 1}`}
                                                className='w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105'
                                                priority={index === 0}
                                            />
                                        </div>

                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                            <div className="absolute -top-full left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                                        </div>

                                        <div className="absolute hidden md:block bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-4 border border-white/20">
                                                <h3 className="text-white font-semibold text-lg mb-1">
                                                    {item?.Events?.eventName || '-'}
                                                </h3>
                                                <p className="text-white/80 text-sm">
                                                    {item?.Events?.description || '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CarouselPrevious className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 w-12 h-12" />
                    <CarouselNext className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 w-12 h-12" />
                </div>
            </Carousel>
        </div>
    )
}