import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

export default function CarouselSlider() {
    return (
        <Carousel className="w-full ">
            <CarouselContent>
                {Array.from({ length: 10 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card className='h-[200px] lg:h-[400px]'>
                                <CardContent className="flex items-center justify-center p-6">
                                    <span className="text-4xl font-semibold">{index + 1}</span>
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