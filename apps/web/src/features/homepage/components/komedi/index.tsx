import CarouselComedy from "./../../../../components/carousell/carouselComedy"

export default function KomediSection({ queryGetComedyEvent }: any) {
    return (
        <div className="space-y-4">
            <div className="px-2 lg:px-20">
                <h1 className="text-2xl font-bold">
                    Komedi
                </h1>
            </div>
            <div className="relative w-full flex justify-center items-center overflow-hidden">
                <div className="w-full px-2 lg:px-20 h-[900px] xl:h-[500px] relative">
                    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-r
                from-black via-slate-800 to-blue-950"/>
                </div>

                <div className="absolute inset-0 flex flex-col justify-center items-center space-y-8 lg:space-y-12 px-4">
                    <div className="w-full max-w-7xl">
                        <CarouselComedy
                            data={queryGetComedyEvent}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}