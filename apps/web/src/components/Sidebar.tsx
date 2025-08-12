import {
  FaHome,
  FaTicketAlt,
  FaChartBar,
  FaFileAlt,
  FaCheckSquare,
  FaUser,
  FaKey,
  FaMoneyBillWave,
  FaSignOutAlt,
} from 'react-icons/fa';
import Link from 'next/link';
import authStore from './../zustand/authstore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from './../../public/Logo.webp'

export const SidebarMenu = () => {
  const logout = authStore((state) => state.resetAuth);
  const ownerName = authStore((state) => state.ownerName);
  const organizerName = authStore((state) => state.organizerName);
  const profilePicture = authStore((state) => state.profilePicture);
  const router = useRouter();
  const handleLogout = () => {
    authStore.getState().resetAuth()
    Cookies.remove('role');
    Cookies.remove('token');
    router.push('/event-organizer/login');
  };
  return (
    <section className="hidden lg:block fixed h-screen bg-blue-950 w-2/12 z-20 pt-2">
      <div className="text-white min-h-screen p-5">
        <div className="text-2xl font-bold mb-8">
          <Image
            width={500}
            height={500}
            alt='ticket-box'
            src={logo}
            className='object-cover'
          />
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
            <Image
              src={
                profilePicture?.includes('https')
                  ? profilePicture
                  : `https://api-vi-ticketbox.gancy.my.id/api/src/public/images/${profilePicture}`
              }
              width={500}
              height={500}
              alt="foto-profil"
              className="rounded-full w-12 h-12 object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">{ownerName ? ownerName.split(' ')[0] : 'Admin'}</p>
            <p className="text-xs w-full text-gray-300">
              {organizerName?.length > 8 ? <h1>{organizerName?.slice(0, 8)}..</h1> : organizerName}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Link href="/event/dashboard">
            <button className="flex items-center w-full space-x-3 py-2 px-4 rounded bg-blue-800">
              <FaHome className="text-lg" />
              <span className="text-xs">Dashboard</span>
            </button>
          </Link>

          <div className="text-gray-400 uppercase text-xs tracking-wider pt-7">
            Management Event
          </div>

          <Link href="/event/dashboard/list-event">
            <button className="flex items-center w-full space-x-3 py-2 px-4 hover:bg-blue-700 rounded">
              <FaTicketAlt className="text-lg" />
              <span className="text-xs">Event Saya</span>
            </button>
          </Link>

          <Link href="/event/dashboard/transaction">
            <button className="flex items-center w-full space-x-3 py-2 px-4 hover:bg-blue-700 rounded">
              <FaChartBar className="text-xs" />
              <span className="text-xs">Laporan Penjualan</span>
            </button>
          </Link>

          <div className="text-gray-400 uppercase text-xs tracking-wider pt-6">
            Akun
          </div>

          <Link href="/event/dashboard/profile-event-organizer/profile">
            <button className="flex items-center space-x-3 w-full py-2 px-4 hover:bg-blue-700 rounded">
              <FaUser className="text-lg" />
              <span className="text-xs">Informasi Dasar</span>
            </button>
          </Link>

          <Link href="/event/dashboard/profile-event-organizer/reset-password">
            <button className="flex items-center w-full space-x-3 py-2 px-4 hover:bg-blue-700 rounded">
              <FaKey className="text-lg" />
              <Link href="/event/dashboard/profile-event-organizer/reset-password">
                <span className="text-xs">Kata sandi</span>
              </Link>
            </button>
          </Link>


          <button
            onClick={handleLogout}
            className="flex items-center w-full space-x-3 py-2 px-4 hover:bg-blue-700 rounded"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="text-xs">Keluar</span>
          </button>
        </div>
      </div>
    </section>
  );
};
