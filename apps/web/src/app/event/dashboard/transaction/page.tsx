// components/EventTable.tsx
'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import instance from '@/utils/axiosInstance/axiosInstance';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import authStore from '@/zustand/authstore';
import { Tooltip } from 'react-tooltip';
import { useDebouncedCallback } from 'use-debounce';

export default function EventTable() {
    const [page, setPage] = useState(1)
    const [searchTransaction, setSearchTransaction] = useState('')
    const [entriesPerPage, setEntriesPerPage] = useState(5)
    const profilePicture = authStore((state) => state.profilePicture)
    const { data: getTransactionData, isFetching } = useQuery({
        queryKey: ['get-data', page, searchTransaction],
        queryFn: async () => {
            const res = await instance.get('/event-organizer/report', {
                params: {
                    page,
                    search: searchTransaction
                }
            })
            return res.data.data
        }
    })

    const debounce = useDebouncedCallback((values) => {
        setSearchTransaction(values)
        console.log(values)
    }, 1000)

    console.log(getTransactionData, "<<<< mantap")

    if (isFetching) return (
        <main className="flex flex-col h-fit w-full px-8 space-y-10 p-10">
            <div className="w-full py-10 flex flex-col px-4 bg-neutral-200 rounded-lg"></div>
            <div className="flex justify-between w-full items-center">
                <div className="text-lg font-bold bg-neutral-200 rounded-lg py-4 w-1/2"></div>
                <div className="flex justify-end gap-8">
                    <div className="px-8 py-2 font-bold text-white bg-neutral-200 rounded-lg transition-all duration-300"></div>
                    <Avatar className="transition-all duration-300">
                        <AvatarImage src='' alt="@shadcn" />
                        <AvatarFallback>TB</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div className='w-full h-80 bg-neutral-200 rounded-lg'></div>
        </main>
    )

    return (
        <main className="flex flex-col h-fit w-full px-8 space-y-10 p-10">
            <div className="w-full py-3 flex flex-col px-4 bg-yellow-400 rounded-lg">
                <h1 className="font-bold text-xl text-black">Daftar Transaksi</h1>
                <p className="w-full text-neutral-500">Dashboard / Daftar Transaksi</p>
            </div>
            <div className='w-full flex gap-3 items-center'>
                <div className='relative w-full'>
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="w-full py-2 border px-2 border-gray-300 rounded"
                        onChange={(e) => debounce(e.target.value)}
                    />
                </div>
                <div className="flex gap-8 w-full justify-end">
                    <Link href="/event/dashboard/list-event" className='flex items-center px-4 font-bold text-white drop-shadow-lg bg-blue-500 rounded-lg hover:bg-blue-700 transition-all duration-300'>
                        <h1 className="font-semibold">
                            Event List
                        </h1>
                    </Link>
                    <Avatar className="border-blue-400 border-2 hover:border-yellow-500 transition-all duration-300">
                        <AvatarImage src={profilePicture} alt="profil" className='object-cover' />
                        <AvatarFallback>TB</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">No</th>
                            <th className="py-3 px-6 text-left">ID Transaksi</th>
                            <th className="py-3 px-6 text-left">Event ID</th>
                            <th className="py-3 px-6 text-left">Total Harga</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-left">Quantity</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {getTransactionData?.findTransaction?.map((item: any, index: any) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{((page - 1) * entriesPerPage) + index + 1}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">

                                    {item?.id?.length > 10 ?
                                        <h1 data-tooltip-id="my-tooltip"
                                            data-tooltip-content={item?.id}>{item?.id?.slice(0, 10)}..</h1> : item?.id
                                    }
                                    <Tooltip id='my-tooltip' />
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{item?.eventId}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">Rp. {item?.totalPrice.toLocaleString('id-ID')}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{item?.transactionStatus[0]?.status}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{item?.transactionDetail[0]?.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center">
                {getTransactionData?.findTransaction?.length > 0 ? (
                    Array(getTransactionData?.totalPage)
                        .fill(0)
                        .map((_, index) => {
                            return (
                                <button
                                    key={index}
                                    className="join-item btn btn-sm mx-2 border rounded-lg w-10 h-10 hover:bg-slate-400  hover:font-bold transition-all active:bg-yellow-500  focus:ring focus:bg-blue-950 focus:text-white duration-300 ease-in-out "
                                    onClick={() => {
                                        setPage(index + 1)
                                    }}
                                >
                                    {index + 1}
                                </button>
                            );
                        })
                ) : (
                    <h1 className="font-bold">
                        Data belum tersedia.
                    </h1>
                )}
            </div>
        </main >
    );
}
