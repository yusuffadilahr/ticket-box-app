// components/EventTable.tsx
'use client';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import instance from '@/utils/axiosInstance/axiosInstance';
import { useDebouncedCallback } from 'use-debounce';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaRegEye } from 'react-icons/fa6';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import authStore from '@/zustand/authstore';





interface EventData {
  id: Number;
  eventName: string;
  category: {
    Category: string;
  };
  isPaid: boolean;
  location: string;
  startEvent: string;
  endEvent: string;
}

export default function EventTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);
  const [searchInput, setSearchInput] = useState(params.get('search') || '');
  const [page, setPage] = useState(Number(params.get('page')) || 1);
  const profilePicture = authStore((state) => state.profilePicture)

  const { data: getEventList, refetch, isFetching } = useQuery({
    queryKey: ['get-event-list', searchInput, page],
    queryFn: async () => {
      const res = await instance.get(`/event/organizer-event`, {
        params: { page, limit_data: 5, search: searchInput },
      });
      console.log(res.data.data);
      return res.data.data;
    },
  });

  const { mutate: mutateDeleteData } = useMutation({
    mutationFn: async (id: any) => {
      await instance.delete(`/event/delete-event/${id}`);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  console.log(getEventList, '<<<<<<<<<< gas');

  const debounceSearch = useDebouncedCallback((values) => {
    setSearchInput(values);
    setPage(1);
  }, 500);

  useEffect(() => {
    const currentUrl = new URLSearchParams(searchParams);
    currentUrl.set('page', page.toString());

    if (searchInput) {
      currentUrl.set('search', searchInput);
    } else {
      currentUrl.delete('search');
    }
    router.push(`${pathname}?${currentUrl.toString()}`);
  }, [page, searchInput]);

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
        <h1 className="font-bold text-xl text-black">Daftar Event</h1>
        <p className="w-full text-neutral-500">Dashboard / Daftar Event</p>
      </div>
      <div className='w-full flex gap-3 items-center'>
        <div className='relative w-full'>
          <input
            type="text"
            placeholder="Search events..."
            className="w-full py-2 border px-2 border-gray-300 rounded"
            onChange={(e) => debounceSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-8 w-full justify-end">
          <Link href="/event/dashboard/c" className='flex items-center px-4 font-bold text-white drop-shadow-lg bg-blue-500 rounded-lg hover:bg-blue-700 transition-all duration-300'>
            <h1 className="font-semibold">
              + Buat Event
            </h1>
          </Link>
          <Avatar className="border-blue-400 border-2 hover:border-yellow-500 transition-all duration-300">
            <AvatarImage src={profilePicture} alt="@shadcn" />
            <AvatarFallback>TB</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">Kategori</th>
              <th className="py-3 px-6 text-left">Lokasi</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Tanggal</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {getEventList &&
              getEventList?.eventList?.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td
                    className="py-3 px-6 text-left whitespace-nowrap"

                  >
                    {item?.eventName?.length > 15 ? (
                      <h1
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={item?.eventName}
                        data-tooltip-place="top">{item?.eventName?.slice(0, 15)}...</h1>
                    ) : (
                      item?.eventName!
                    )}
                    <Tooltip id="my-tooltip" />
                  </td>
                  <td className="py-3 px-6 text-left">
                    {item?.category?.Category!}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {item?.location?.length > 15 ? (
                      <h1>{item?.location?.slice(0, 15)}...</h1>
                    ) : (
                      item?.location!
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {item?.isPaid! == true ? 'Berbayar' : 'Gratis'}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {item?.startEvent.split('T')[0]}
                  </td>
                  <td className="py-3 px-6 text-left space-x-1">
                    <Dialog>
                      <DialogTrigger>
                        <button id='view' className="bg-green-600 p-2 rounded-md">
                          <FaRegEye color="white" />
                        </button>
                        <Tooltip anchorSelect='#view' place='top' content='Lihat Tiket' />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Tiket</DialogTitle>
                          <DialogDescription className='overflow-y-auto max-h-96 space-y-2'>
                            {
                              item?.tickets?.map((item: any, index: number) => {
                                return (

                                  <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-md w-full mx-auto">
                                    <div className="flex  items-start">
                                      <div>
                                        <h3 className="text-lg font-semibold">
                                          {item?.ticketName}
                                        </h3>
                                        <p className="text-gray-600 mt-1">
                                          {item?.ticketType}
                                        </p>
                                        <div className="text-blue-600 mt-2">
                                          <span className="flex items-center">
                                            <MdOutlineAccessTimeFilled />
                                            Mulai {item?.startDate.split('T')[0]} • {item?.startDate.split('T')[1].split('.')[0].slice(0, -3)}
                                          </span>
                                          <span className="flex items-center">
                                            <MdOutlineAccessTimeFilled />
                                            Berakhir {item?.endDate.split('T')[0]} • {item?.endDate.split('T')[1].split('.')[0].slice(0, -3)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <hr className="my-4 border-blue-300 border-dashed" />
                                    <div className="flex justify-between items-center">
                                      <p className="text-xl font-semibold">

                                        {
                                          item.discount > 0 ? (
                                            <div>
                                              <span className="line-through mr-2 text-gray-500">Rp.{item.price}</span>
                                              <span className="text-red-600">
                                                Rp{(item.price - item.discount).toLocaleString("id-ID")}
                                              </span>
                                            </div>
                                          ) : item.price == 0 ? 'Gratis'
                                            :
                                            (`Rp${item.price.toLocaleString("id-ID")}`)
                                        }

                                      </p>
                                      <div className="flex items-center space-x-4">
                                        Kuota/Sisa Tiket: <span className='text-black font-bold'>{item.totalSeat}/{item.seatAvailable}</span>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })
                            }



                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>









                    <AlertDialog>
                      <AlertDialogTrigger>
                        <button id='delete' className="bg-red-600 p-2 rounded-md">
                          <FaRegTrashAlt color="white" />
                        </button>
                        <Tooltip anchorSelect='#delete' place='top' content='Hapus Event' />

                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Peringatan</AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus Event ini?
                            Event yang sudah dihapus tidak bisa dikembalikan lagi.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => mutateDeleteData(item?.id)}
                          >
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Link href={`/event/dashboard/u/${item?.id}`}>
                      <button id='update' className="bg-yellow-500 p-2 rounded-md">
                        <FaPencil color="white" />
                      </button>
                      <Tooltip anchorSelect='#update' place='top' content='Update Event' />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        {getEventList?.eventList?.length > 0 ? (
          Array(getEventList?.totalPage)
            .fill(0)
            .map((item, index) => {
              return (
                <button
                  key={index}
                  className="join-item btn btn-sm mx-2 border rounded-lg w-10 h-10 hover:bg-slate-400  hover:font-bold transition-all active:bg-yellow-500  focus:ring focus:bg-blue-950 focus:text-white duration-300 ease-in-out "
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              );
            })
        ) : (
          <h1 className="font-bold">
            Data tidak tersedia, silahkan buat event.
          </h1>
        )}
      </div>
    </main>
  );
}
