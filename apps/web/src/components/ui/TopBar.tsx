import {
    FaHome,
    FaTicketAlt,
    FaChartBar,
    FaUser,
    FaKey,
    FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import authStore from "@/zustand/authstore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const TopBar = () => {
    const logout = authStore((state) => state.resetAuth);
    const ownerName = authStore((state) => state.ownerName);
    const organizerName = authStore((state) => state.organizerName);
    const profilePicture = authStore((state) => state.profilePicture);
    const router = useRouter();

    const handleLogout = () => {
        authStore.getState().resetAuth();
        Cookies.remove("role");
        Cookies.remove("token");
        router.push("/event-organizer/login");
    };

    return (
        <div>
            <nav className="lg:hidden fixed top-0 left-0 w-full bg-blue-950 z-30 flex items-center justify-between px-4 py-2">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="p-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-5 bg-blue-950 text-white">
                        <div className="min-h-screen">
                            <div className="text-2xl font-bold mb-8">
                                <div>Logo</div>
                            </div>
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                    <Image
                                        src={
                                            profilePicture?.includes("https")
                                                ? profilePicture
                                                : `http://localhost:8000/api/src/public/images/${profilePicture}`
                                        }
                                        width={500}
                                        height={500}
                                        alt="foto-profil"
                                        className="rounded-full"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold">
                                        {ownerName ? ownerName.split(" ")[0] : "Admin"}
                                    </p>
                                    <p className="text-xs w-full text-gray-300">
                                        {organizerName?.length > 8 ? (
                                            <h1>{organizerName?.slice(0, 8)}..</h1>
                                        ) : (
                                            organizerName
                                        )}
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
                                <Link href="/event/dashboard/penjualan-tiket">
                                    <button className="flex items-center w-full space-x-3 py-2 px-4 hover:bg-blue-700 rounded">
                                        <FaTicketAlt className="text-lg" />
                                        <span className="text-xs">Penjualan Tiket</span>
                                    </button>
                                </Link>
                                <Link href="/event/dashboard/report">
                                    <button className="flex items-center w-full space-x-3 py-2 px-4 hover:bg-blue-700 rounded">
                                        <FaChartBar className="text-lg" />
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
                                        <span className="text-xs">Kata sandi</span>
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
                    </SheetContent>
                </Sheet>

                <div className="text-white text-lg font-bold">Logo</div>

                <Link href="/event/dashboard/buat-event">
                    <Button className="bg-blue-700 text-white hover:bg-blue-600">
                        Buat Event
                    </Button>
                </Link>
            </nav>
        </div>
    );
};
