import Link from "next/link";

export default function Kategori({ categoryList, iconComponents }: any) {
    return (
        <div className="flex justify-center gap-5 lg:gap-10 mt-5" >
            {categoryList?.map((item: any, index: any) => {
                const IconComponent: any = iconComponents[item?.logo as keyof typeof iconComponents];
                return (
                    <Link key={index} href={item.link} className='text-blue-900 hover:text-blue-600'>
                        <div className="flex flex-col items-center gap-2">
                            <div>
                                <IconComponent className="rounded-full p-4 transition-all duration-300 w-[80px] h-[80px]" />
                            </div>
                            <div className="flex justify-center font-bold">
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