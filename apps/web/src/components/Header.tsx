'use client';

import { FaRegCalendarAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { FaCompass } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Logo from '../../public/Logo.webp';
import { usePathname } from 'next/navigation';
import AvatarHover from './homepage/avatar';
import authStore from '@/zustand/authstore';
import { useQuery } from '@tanstack/react-query';
import instance from '@/utils/axiosInstance/axiosInstance';
import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Cookies from 'js-cookie';
import { signOut } from 'firebase/auth';
import auth from '@/utils/firebase/firebase';

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export const Header = () => {
  const [isBlur, setIsBlur] = useState(false);
  const [valueInput, setValueInput] = useState<string>('');
  const token = authStore((state) => state?.token);
  const setAuth = authStore((state) => state.setAuth)
  const router = useRouter();

  const pathname = usePathname();
  const inputRef: any = useRef(null);

  const { data: querySearchData } = useQuery({
    queryKey: ['query-search-data', valueInput],
    queryFn: async () => {
      const res = await instance.get('/event/search', {
        params: {
          event: valueInput,
          page: 1,
          limit_data: 100,
        },
      });
      return res.data.data.eventSearch;
    },
    enabled: !!valueInput,
  });

  const debounce = useDebouncedCallback((values) => {
    if (values) {
      setValueInput(values);
    } else {
      setValueInput('');
    }
  }, 200);

  const handleRedirectToOrganizerPage = async () => {
    await signOut(auth)

    // if (window.gapi && window.gapi.auth2) {
    //   const googleAuth = window.gapi.auth2.getAuthInstance();
    //   await googleAuth.signOut(); // Logout dari Google
    //   console.log('Google signed out');
    // }

    setAuth({ token: '' });
    Cookies.remove('role');
    Cookies.remove('token');
    router.push('/event-organizer/login');
  };

  return (
    <>
      <nav
        className={`${pathname.startsWith('/event/dashboard') || pathname.startsWith('/event-organizer') ? 'hidden' : 'block'} lg:px-20 w-full lg:py-2 fixed z-20`}
      >
        <section className="h-14 lg:h-20 top-0 px-5 items-center text-white justify-between flex lg:rounded-xl bg-blue-950 relative">
          {isBlur && valueInput && (
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-10"></div>
          )}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button>
                  {' '}
                  <RxHamburgerMenu />
                </button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    Name
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    Username
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                width={500}
                height={500}
                alt="Logo"
                className="w-24 lg:w-36"
                src={Logo}
              />
            </Link>
          </div>
          <div
            className={`${pathname.startsWith('/user') ? 'hidden' : 'block'} relative z-30`}
          >
            <input
              ref={inputRef}
              onBlur={() => {
                inputRef?.current?.value ? setIsBlur(true) : setIsBlur(false);
              }}
              onFocus={() => setIsBlur(true)}
              type="text"
              placeholder="Search..."
              className="focus:outline-none bg-white pr-10 pl-4 py-3 z-30 text-sm rounded-md shadow-md sm:w-[300px] lg:w-[550px] text-black"
              onChange={(e) => debounce(e.target.value)}
            />
            {/* ${pathname.startsWith */}
            <div className="absolute z-10 bg-white  w-full mt-1 rounded-md shadow-lg max-h-96 overflow-auto text-black">
              {isBlur && valueInput && (
                <div className="flex flex-col">
                  <div className="w-full px-4 py-5">
                    <h1 className="border-b-4 border-yellow-500 pb-3">
                      Hasil Penelusuran
                    </h1>
                  </div>
                  {querySearchData?.map((item: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                        onClick={() => {
                          router.push(
                            `/event/explore/${item.id}TBX${item.startEvent.split('T')[0].split('-').join('')} ${item.eventName.toLowerCase().split(' ').join('-')}`,
                          );
                          setValueInput('');
                        }}
                      >
                        <div className="grid grid-cols-2">
                          <h1 className="text-sm">
                            {item?.eventName} - {item?.location}
                          </h1>
                          <div className="w-full flex justify-end">
                            <h1 className="text-sm">
                              Rp.{' '}
                              {item?.tickets[0]?.price.toLocaleString('id-ID')}
                            </h1>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <FaSearch className="text-gray-400 h-5 w-5 cursor-pointer" />
            </span>
          </div>

          <div className="hidden lg:flex gap-5 items-center px-5">
            <div className="  hover:text-slate-300 transition-all duration-200 ease-in-out">
              <div className="flex items-center gap-1">
                <FaRegCalendarAlt />
                <button
                  onClick={handleRedirectToOrganizerPage}
                  className="font-bold text-sm"
                >
                  Buat Event
                </button>
              </div>
            </div>
            <div className="hover:text-slate-300 transition-all duration-200 ease-in-out">
              <Link href="/event/explore" className="flex gap-1 items-center">
                <FaCompass />
                <button className="font-bold text-sm">Jelajah</button>
              </Link>
            </div>
            <div className="flex gap-3 ">
              {!!token ? (
                <>
                  <div
                    className={`${pathname.startsWith('/event-organizer/') ? 'hidden' : 'block'}`}
                  >
                    <AvatarHover />
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href={'/user/register'}
                    className={`py-2 hover:text-slate-300 border border-white px-5 rounded-xl transition-all duration-200 ease-in-ou ${pathname.startsWith('/event-organizer/login') ? 'hidden' : 'block'}`}
                  >
                    Register
                  </Link>
                  <Link
                    href={'/user/login'}
                    className={`py-2 px-5 rounded-xl bg-blue-700 hover:bg-blue-800 transition-all duration-200 ease-in-out ${pathname.startsWith('/event-organizer/login') ? 'hidden' : 'block'}`}
                  >
                    Masuk
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </nav>
    </>
  );
};
