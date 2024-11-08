'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function OrganizerDashboard() {
    return (
        <main className="flex">
            <section className="h-screen  w-full px-8 space-y-10 p-10">
                <div className='flex justify-end gap-8'>
                    <button className='px-4 font-bold text-white drop-shadow-lg bg-blue-500 rounded-lg hover:bg-blue-700 transition-all duration-300'>
                        + Buat Event
                    </button>
                    <Avatar className=' border-blue-400 border-2 hover:border-yellow-500 transition-all duration-300'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className='font-bold text-2xl text-gray-700'>Hello User</div>
                <div className="w-full h-[500px] grid grid-cols-4 grid-rows-4 gap-4">
                    <div className="text-white bg-cyan-500 rounded-lg flex flex-col justify-center items-center drop-shadow-lg">
                        <div>Saldo Saya</div>
                        <div>Rp.</div>
                    </div>
                    <div className="text-white bg-blue-700 rounded-lg flex flex-col justify-center items-center drop-shadow-lg">
                        <div>Event Saya</div>
                        <div>0</div>
                    </div>
                    <div className="text-white bg-red-500 rounded-lg flex flex-col justify-center items-center drop-shadow-lg">
                        <div>Jumlah Booking</div>
                        <div>0</div>
                    </div>
                    <div className="text-white bg-gray-700 rounded-lg flex flex-col justify-center items-center drop-shadow-lg">
                        <div>Total Transaksi</div>
                        <div>0</div>
                    </div>
                    <div className="col-span-2 row-span-3 rounded-lg drop-shadow-lg">chart1</div>
                    <div className="col-span-2 row-span-3 rounded-lg drop-shadow-lg">chart2</div>
                </div>
            </section>
        </main>
    )
}
