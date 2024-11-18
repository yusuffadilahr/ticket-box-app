// components/EventTable.tsx
'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import instance from '@/utils/axiosInstance/axiosInstance';
import { useDebouncedCallback } from 'use-debounce';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMutation } from '@tanstack/react-query';

import authStore from '@/zustand/authstore';
import SkeletonListEvent from '@/components/eventDashboard/skeletonListEvent';
import CreateEventButton from '@/components/eventDashboard/createEventButton';
import SearchEventInput from '@/components/eventDashboard/searchEventInput';
import ListEventTable from '@/components/eventDashboard/listEventTable';




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
    <SkeletonListEvent />
  )

  return (
    <main className="flex flex-col h-fit w-full px-0 lg:px-8 space-y-10 p-10">
      <div className="w-full py-3 flex flex-col px-4 bg-yellow-400 rounded-lg">
        <h1 className="font-bold text-xl text-black">Daftar Event</h1>
        <p className="w-full text-neutral-500">Dashboard / Daftar Event</p>
      </div>
      <div className='w-full flex gap-3 items-center'>
        
        <SearchEventInput
          debounceSearch={debounceSearch}
        />
        <div className="hidden lg:flex gap-8 w-full justify-end">
          <CreateEventButton />
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
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">Kategori</th>
              <th className="py-3 px-6 text-left">Lokasi</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Tanggal</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">

            <ListEventTable
              getEventList={getEventList}
              mutateDeleteData={mutateDeleteData}
              page={ page }
                />

          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        {getEventList?.eventList?.length > 0 ? (
          Array(getEventList?.totalPage)
            .fill(0)
            .map((_, index) => {
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
