import { Avatar, AvatarFallback, AvatarImage } from './../../components/ui/avatar';


export default function SkeletonListEvent() {
    return (
        <main className="flex flex-col h-fit w-full px-0 lg:px-8 space-y-10  p-10">
            <div className="w-full py-10 flex flex-col px-4 bg-neutral-200 rounded-lg animate-pulse"></div>
            <div className="flex justify-between w-full items-center">
                <div className="text-lg font-bold bg-neutral-200 rounded-lg py-4 w-1/2 animate-pulse"></div>
                <div className="flex justify-end gap-8">
                    <div className="px-8 py-2 font-bold text-white bg-neutral-200 rounded-lg animate-pulse transition-all duration-300"></div>
                    <Avatar className="transition-all duration-300">
                        <AvatarImage src='' alt="@shadcn" />
                        <AvatarFallback>TB</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div className='w-full h-80 bg-neutral-200 rounded-lg animate-pulse'></div>
        </main>
    )
}