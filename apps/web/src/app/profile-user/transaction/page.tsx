
'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaShoppingCart, FaLock, FaHeart, FaCog } from 'react-icons/fa';
import { useState } from "react";
import ProfileHeader from "@/components/profile/profile";
import LeftMenu from "@/components/profile/leftMenu";

export default function ProfileTransaction() {

    return (
        <main className="pt-28 px-20">
            <section className=" flex justify-between items-center">
                <ProfileHeader />
            </section>

            <section className="flex">
                <section className="mt-10 flex h-fit">
                    <LeftMenu />
                </section>
                <section className="w-3/4 bg-white rounded-lg shadow-lg ml-5 p-5">
                    <h2 className="text-xl font-semibold mb-5">Transaksi</h2>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID Transaksi</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Event</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal Transaksi</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Jumlah</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total Harga</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr className="border-b">
                                <td className="px-6 py-4 text-sm text-gray-600">#12345</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Event Name</td>
                                <td className="px-6 py-4 text-sm text-gray-600">2023-11-03</td>
                                <td className="px-6 py-4 text-sm text-gray-600">2</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Completed</td>
                                <td className="px-6 py-4 text-sm text-gray-600">RP. 500,000</td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    <button className="text-blue-500 hover:underline">View</button>
                                </td>
                            </tr> */}
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>
        </main>
    )
}