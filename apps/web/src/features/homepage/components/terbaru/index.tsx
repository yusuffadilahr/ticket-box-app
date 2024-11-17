import CarousellEvent from "@/components/carousell/carouselEvent"

export default function Terbaru({ queryGetDataNewest }:any) {
    return (
        <div className="px-12 lg:px-20">
            <h1 className="text-2xl font-bold">
                Event Terbaru
                <div className="mt-4">
                    <CarousellEvent data={queryGetDataNewest} />
                </div>
            </h1>
        </div>

    )
}