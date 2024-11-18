import CarousellEvent from "./../../../../components/carousell/carouselEvent"

export default function TopSeller({ queryGetDataTopSell }:any) {
    return (
        <div className=" px-12 lg:px-20">
            <h1 className="text-2xl font-bold">
                Top Seller
                <div className="mt-4">
                    <CarousellEvent data={queryGetDataTopSell} />
                </div>
            </h1>
        </div>
    )
}