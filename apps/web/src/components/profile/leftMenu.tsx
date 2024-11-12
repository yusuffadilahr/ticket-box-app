import { FaShoppingCart, FaLock, FaCog } from 'react-icons/fa';
import Link from 'next/link'

export default function LeftMenu() {
    const menuItems = [
        { name: "Pengaturan Akun", icon: <FaCog />, link: "/profile-user/profile" },
        { name: "Transaksi Event", icon: <FaShoppingCart/>, link: "/profile-user/transaction" },
        { name: "Atur Kata Sandi", icon: <FaLock />, link: "/profile-user/reset-password" },
    ];

    return (
        <aside className="w-72 bg-white rounded-lg shadow-lg p-5">
            <ul className="space-y-4">
                {menuItems.map((item, index) => (
                    <Link href={item.link} key={index}>
                        <li
                            className="flex items-center focus:bg-gray-400 active:bg-gray-200 hover:bg-gray-200 hover:font-bold transition-all duration-300 ease-in-out space-x-2 cursor-pointer p-2 rounded-lg">
                            <span className="text-yellow-500">{item.icon}</span>
                            <span>{item.name}</span>
                        </li>
                    </Link>
                ))}
            </ul>
        </aside>
    );
}