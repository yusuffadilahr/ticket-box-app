"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './../../components/ui/sheet';
import { RxHamburgerMenu } from 'react-icons/rx';
import RegisterButton from './registerButton';
import LoginButton from './loginButton';
import JelajahButton from './jelajahButton';
import BuatEventButton from './buatEventButton';
import AvatarHover from './../../components/homepage/avatar';
import Link from 'next/link';
import { FaStar } from "react-icons/fa";

export default function HamburgerMenu({ handleLogout, loyaltyPoints, pathname, handleRedirectToOrganizerPage, token, firstName, lastName }: any) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button>
                    {' '}
                    <RxHamburgerMenu />
                </button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle className='mb-10'>Menu</SheetTitle>

                </SheetHeader>
                {!!token ? (
                    <>
                        <div
                            className={`${pathname.startsWith('/event-organizer/') ? 'hidden' : 'block'} space-y-2 mb-10 `}
                        >
                            <div className='flex justify-center'>Halo, Selamat Datang</div>

                            <div className='bg-gray-200 p-2 rounded-lg flex items-center justify-center text-xl gap-4 font-bold'>
                                <AvatarHover />
                                {firstName} {lastName}
                            </div>
                            <div className="space-y-3 flex flex-col w-full text-left">
                                <div className=" font-bold mb-10 text-blue-800 flex justify-center items-center space-x-2" >
                                    <div className="flex items-center"><FaStar /> <span className='ml-1'>Loyalty Points</span></div>
                                    <div className="text-lg">{loyaltyPoints}</div>
                                </div>
                                <Link href="/profile-user/profile" className="flex py-1">
                                    <button className="text-lg hover:font-bold transition-all duration-300 ">
                                        View Profile
                                    </button>
                                </Link>
                                <Link href="/profile-user/reset-password" className="flex py-1">
                                    <button className="text-lg hover:font-bold transition-all duration-300">
                                        Reset Password
                                    </button>
                                </Link>
                                <Link href="/profile-user/transaction" className="flex py-1">
                                    <button className="text-lg hover:font-bold transition-all duration-300">
                                        My Tickets
                                    </button>
                                </Link>
                                <button onClick={handleLogout} className="text-lg flex py-1 w-full text-red-600 font-bold">
                                    Log Out
                                </button>

                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='space-y-4'>
                            <RegisterButton pathname={pathname} color="black" />
                            <LoginButton pathname={pathname} />
                        </div>
                    </>
                )}
                <div className=" text-xl border border-gray-400 rounded-xl p-2 mb-4">
                    <JelajahButton size="xl"/>
                </div>
                <div className="border text-xl border-gray-400 rounded-xl p-2">
                    <BuatEventButton size="xl" handleRedirectToOrganizerPage={handleRedirectToOrganizerPage} />
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}