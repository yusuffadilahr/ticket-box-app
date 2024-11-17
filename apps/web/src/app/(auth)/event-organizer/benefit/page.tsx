import { FaUsers, FaChartPie, FaTicketAlt, FaMoneyBillWave, FaCheckSquare, FaHeadset } from 'react-icons/fa';
import FeatureCard from '@/features/event-organizer/component/FeatureCard';
import Link from 'next/link';

export default function benefitOrganizer() {
    return (
        <div className="pt-20 lg:pt-36 flex flex-col items-center min-h-screen py-10 px-4 bg-gray-50">
            <title>Event Organizer Dashboard</title>


            <h1 className="text-3xl font-bold text-center mb-4">Welcome Event Organizer</h1>
            <p className="text-center text-gray-600">
                Solusi sistem pemesanan Tiket event secara online hingga kunjungan di lokasi.
            </p>

            <Link href="/event-organizer/register" className='my-10 bg-blue-600 rounded-lg hover:bg-blue-800 text-white font-bold transition-all duration-300 ease-in-out px-5 py-3'>GABUNG BERSAMA KAMI</Link>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                <FeatureCard
                    icon={<FaUsers className="text-blue-500" />}
                    title="Manage Crew"
                    description="Manage Crew dalam satu dashboard dan barcode yang terintegrasi dalam sistem kami."
                />
                <FeatureCard
                    icon={<FaChartPie className="text-blue-500" />}
                    title="Manage Event"
                    description="Manage Event kamu dengan Admin Dashboard untuk setiap Organizer"
                />
                <FeatureCard
                    icon={<FaTicketAlt className="text-blue-500" />}
                    title="Custom Ticket"
                    description="Kamu bisa generate tiket untuk tamu undangan dan Penjualan tiket offline (OTS)"
                />
                <FeatureCard
                    icon={<FaMoneyBillWave className="text-blue-500" />}
                    title="Biaya Rendah"
                    description="Sekarang kamu bisa Withdraw secara otomatis hanya dalam waktu 1 hari kerja"
                />
                <FeatureCard
                    icon={<FaCheckSquare className="text-blue-500" />}
                    title="Tiket Check-in"
                    description="Check-in dengan barcode yang terintegrasi dan dapat di akses oleh semua device."
                />
                <FeatureCard
                    icon={<FaHeadset className="text-blue-500" />}
                    title="Layanan Tiket"
                    description="Customer Service tersedia untuk memastikan kenyamanan transaksi Anda."
                />

            </div>

        </div>

    )
}