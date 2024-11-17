import Link from "next/link";

export default function Kategori({ categoryList, iconComponents }: any) {
    return (
        <div className="flex justify-center gap-5 lg:gap-10 mt-5" >
            {categoryList?.map((item:any, index:any) => {
                const IconComponent: any = iconComponents[item?.logo as keyof typeof iconComponents];
                return (
                    <Link key={index} href={item.link} >
                        <div className="flex flex-col items-center gap-2" >
                            <div>
                                <IconComponent className="rounded-full p-2 lg:p-4 border-2 hover:bg-yellow-500 transition-all duration-300 border-blue-900 text-blue-900 w-[50px] h-[50px] lg:w-[80px] lg:h-[80px]" />
                            </div>
                            < div className="flex justify-center  font-bold text-blue-900" >
                                {item.name}
                            </div>
                        </div>
                    </Link>
                );
            })
            }
        </div>
    )
}