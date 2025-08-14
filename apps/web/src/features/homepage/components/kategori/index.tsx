import Kategori from "./../../../../components/carousell/kategori/"

export default function KategoriSection({ categoryList, iconComponents }: any) {
    return (
        <section className="w-full py-16 lg:pb-20 px-4 lg:px-20">
            {/* Section Header */}
            <div className="w-full">
                <div className="text-center mb-12 lg:mb-16">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-slate-700"></div>
                        <h2 className="text-sm lg:text-base font-semibold text-slate-700 uppercase tracking-wider">
                            Jelajahi
                        </h2>
                        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-slate-700"></div>
                    </div>

                    <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                        <span className="text-slate-700 ">
                            Kategori
                        </span>
                        <span className="text-slate-700"> Event</span>
                    </h1>

                    <p className="text-gray-600 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                        Temukan berbagai kategori event menarik sesuai dengan minat dan passion Anda
                    </p>

                </div>

                {/* Categories Grid */}
                <div className="relative">
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-100/50 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10">
                        <Kategori
                            categoryList={categoryList}
                            iconComponents={iconComponents}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}