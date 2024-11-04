import { FaHome, FaTicketAlt, FaChartBar, FaFileAlt, FaCheckSquare, FaUser, FaKey, FaMoneyBillWave, FaSignOutAlt } from 'react-icons/fa';


export const SidebarMenu = () => {
    return (
        <section className="fixed h-screen bg-blue-950 w-64 pt-2">
            <div className="text-white  min-h-screen p-5">
                {/* Logo */}
                <div className="text-2xl font-bold mb-8">
                    <div>Logo</div>
                </div>

                {/* Profile Section */}
                <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-700 text-xl">👤</span>
                    </div>
                    <div>
                        <p className="font-semibold">oranggila111</p>
                        <p className="text-sm text-gray-300">Organizer</p>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-2">
                    <button className="flex items-center space-x-3 py-2 px-4 rounded bg-blue-800">
                        <FaHome className="text-lg" />
                        <span className='text-sm'>Dashboard</span>
                    </button>

                    <div className="text-gray-400 uppercase text-xs tracking-wider mt-4">
                        Management Event
                    </div>

                    <button className="flex items-center w-full space-x-3 py-2 px-4 hover:bg-blue-700 rounded">
                        <FaTicketAlt className="text-lg" />
                        <span className='text-sm'>Event Saya</span>
                    </button>

                    <button className="flex items-center w-full space-x-3 py-2 px-4 hover:bg-blue-700 rounded">
                        <FaTicketAlt className="text-lg" />
                        <span className='text-sm'>Penjualan Tiket</span>
                    </button>

                    <button className="flex items-center w-full space-x-3 py-2 px-4 hover:bg-blue-700 rounded">
                        <FaChartBar className="text-sm" />
                        <span className='text-sm'>Laporan Penjualan</span>
                    </button>

                    <button className="flex items-center w-full space-x-3 py-2 px-4 hover:bg-blue-700 rounded">
                        <FaFileAlt className="text-lg" />
                        <span className='text-sm'>Invitation Tiket</span>
                    </button>

                    <button className="flex items-center w-full space-x-3 py-2 px-4 hover:bg-blue-700 rounded">
                        <FaCheckSquare className="text-lg" />
                        <span className='text-sm'>Check-in</span>
                    </button>

                    <div className="text-gray-400 uppercase text-xs tracking-wider mt-4">
                        Akun
                    </div>

                    <button className="flex items-center space-x-3 w-full py-2 px-4 hover:bg-blue-700 rounded">
                        <FaUser className="text-lg" />
                        <span className='text-sm'>Informasi Dasar</span>
                    </button>

                    <button className="flex items-center w-full space-x-3 py-2 px-4 hover:bg-blue-700 rounded">
                        <FaKey className="text-lg" />
                        <span className='text-sm'>Kata sandi</span>
                    </button>

                    <button className="flex items-center w-full space-x-3 py-2 px-4 hover:bg-blue-700 rounded">
                        <FaMoneyBillWave className="text-lg" />
                        <span className='text-sm'>Withdraw</span>
                    </button>

                    <button className="flex items-center w-full space-x-3 py-2 px-4 hover:bg-blue-700 rounded">
                        <FaSignOutAlt className="text-lg" />
                        <span className='text-sm'>Keluar</span>
                    </button>
                </div>
            </div>
        </section>
)
}