'use client';
import { FaSearch } from 'react-icons/fa';

import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/Logo.webp';
import { usePathname } from 'next/navigation';
import AvatarHover from './homepage/avatar';
import authStore from './../zustand/authstore';
import { useQuery } from '@tanstack/react-query';
import instance from './../utils/axiosInstance/axiosInstance';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Cookies from 'js-cookie';
import { signOut } from 'firebase/auth';
import auth from './../utils/firebase/firebase';
import RegisterButton from '../components/menu/registerButton'
import LoginButton from '../components/menu/loginButton';
import JelajahButton from '../components/menu/jelajahButton';
import BuatEvent from '../components/menu/buatEventButton';
import SearchBarInput from '../components/menu/searchBarInput';
import SearchBarSuggestion from '../components/menu/searchBarSuggestion';
import HamburgerMenu from '../components/menu/hamburgerMenu';

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export const Header = () => {
  const [isBlur, setIsBlur] = useState(false);
  const [valueInput, setValueInput] = useState<string>('');
  const token = authStore((state) => state?.token);
  const setAuth = authStore((state) => state?.setAuth)
  const firstName = authStore((state) => state?.firstName)
  const lastName = authStore((state) => state?.lastName)
  const router = useRouter();
  const loyaltyPoints = authStore((state) => state.point)
  const logout = authStore((state) => state.setAuth)
  const setKeepAuth = authStore((state) => state.setKeepAuth)

  const pathname = usePathname();
  const inputRef: any = useRef(null);

  const { data: querySearchData, isError, isLoading } = useQuery({
    queryKey: ['query-search-data', valueInput],
    queryFn: async () => {
      try {
        const res = await instance.get('/event/search', {
          params: {
            event: valueInput,
            page: 1,
            limit_data: 10,
          },
        });
        return res.data?.data?.eventSearch ?? [];
      } catch (err) {
        console.error("Search API failed:", err);
        return []
      }
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
    setAuth({ token: '' });
    Cookies.remove('role');
    Cookies.remove('token');
    router.push('/event-organizer/login');
  };

  const handleLogout = () => {
    logout({ token: '' })
    setKeepAuth({
      token: '',
      firstName: '',
      lastName: '',
      role: '',
      phoneNumber: '',
      profilePicture: '',
      referralCode: '',
      identityNumber: '',
    })
  }

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
            <HamburgerMenu
              pathname={pathname}
              handleRedirectToOrganizerPage={handleRedirectToOrganizerPage}
              token={token}
              firstName={firstName}
              lastName={lastName}
              loyaltyPoints={loyaltyPoints}
              handleLogout={handleLogout}
            />
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
            <SearchBarInput
              inputRef={inputRef}
              setIsBlur={setIsBlur}
              debounce={debounce}
            />
            <div className="absolute z-10 bg-white  w-full mt-1 rounded-md shadow-lg max-h-96 overflow-auto text-black">
              {isBlur && valueInput && (
                <SearchBarSuggestion
                  querySearchData={querySearchData}
                  router={router}
                  setValueInput={setValueInput} />

              )}
            </div>

            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <FaSearch className="text-gray-400 h-5 w-5 cursor-pointer" />
            </span>
          </div>

          <div className="hidden lg:flex gap-5 items-center px-5">
            <BuatEvent size="sm" handleRedirectToOrganizerPage={handleRedirectToOrganizerPage} />
            <JelajahButton size="sm" />
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
                  <RegisterButton pathname={pathname} color="white" />
                  <LoginButton pathname={pathname} />
                </>
              )}
            </div>
          </div>
        </section>
      </nav>
    </>
  );
};

