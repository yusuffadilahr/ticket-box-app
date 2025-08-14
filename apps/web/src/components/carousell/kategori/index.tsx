import Link from "next/link";

export default function Kategori({ categoryList, iconComponents }: any) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:max-w-[50%] md:mx-auto">
            {categoryList?.map((item: any, index: number) => {
                const IconComponent: any = iconComponents[item?.logo as keyof typeof iconComponents];
                return (
                    <Link
                        key={index}
                        href={item.link}
                        className="group flex flex-col items-center transition-all duration-300"
                    >
                        <div className="relative mb-4">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full transform group-hover:scale-110 transition-transform duration-300 blur-sm"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-blue-50/80 rounded-full transform group-hover:scale-105 transition-transform duration-300"></div>

                            {/* Main icon container */}
                            <div className="relative w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-white rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-gray-100 group-hover:border-blue-200 overflow-hidden">
                                {/* Icon */}
                                <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-blue-600 group-hover:text-purple-600 transition-colors duration-300 transform group-hover:scale-110" />

                                {/* Shine effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute -top-full left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform rotate-45 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700"></div>
                                </div>
                            </div>

                        </div>

                        {/* Category Name */}
                        <div className="text-center">
                            <h3 className="text-sm lg:text-base xl:text-lg font-bold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 leading-tight">
                                {item.name}
                            </h3>

                            {/* Underline animation */}
                            <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 mx-auto rounded-full"></div>
                        </div>

                        {/* Hover background effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 transform scale-95 group-hover:scale-100"></div>
                    </Link>
                );
            })}
        </div>
    )
}