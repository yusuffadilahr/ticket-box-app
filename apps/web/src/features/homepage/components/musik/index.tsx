import CarousellEvent from "./../../../../components/carousell/carouselEvent"

export default function Musik({ queryGetCategoryMusic }:any) {
    return (
        <div className="px-12 lg:px-20">
            <h1 className="text-2xl font-bold">
                Musik Terbaru
                <div className="mt-4">
                    <CarousellEvent data={queryGetCategoryMusic} />
                </div>
            </h1>
        </div>
    )
}