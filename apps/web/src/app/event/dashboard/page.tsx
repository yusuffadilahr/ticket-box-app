'use client'
import AvatarHover from '@/components/homepage/avatar';
import { SidebarMenu } from '@/components/Sidebar';

export default function OrganizerDashboard() {
    return (
        <main className="h-screen w-full space-y-10 py-10 pr-10">
            <div className='flex justify-end gap-8'>
                <button className='px-4 font-bold text-white drop-shadow-lg bg-blue-500 rounded-lg hover:bg-blue-700 transition-all duration-300'>
                    + Buat Event
                </button>
                <AvatarHover />
            </div>
            <div className='w-full bg-white shadow-xl px-20 border pt-5 rounded-xl'>
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
            </div>
        </main>
    )
}
