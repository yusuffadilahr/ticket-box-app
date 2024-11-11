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
import Logo from '@/../../public/Logo.webp'
import { usePathname } from 'next/navigation';
import authStore from '@/zustand/authstore';
import { useRouter } from 'next/navigation';

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export default function Header() {
    const router = useRouter();

    const pathname = usePathname();
    const token = authStore((state) => state?.token);

    return (
        <>
            <nav className={`${pathname.startsWith('/event/dashboard') ? 'hidden' : 'block'} lg:px-20 w-full lg:py-2 fixed z-20`}
            >
                <section className="h-14 lg:h-20 top-0 px-5 items-center text-white justify-between flex lg:rounded-xl bg-blue-950 relative">
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
                        <Link href="/event/dashboard">
                            <Image
                                width={500}
                                height={500}
                                alt="Logo"
                                className="w-24 lg:w-36"
                                src={Logo}
                            />
                        </Link>
                    </div>
                    <div className="hidden lg:flex gap-5 items-center px-5">
                        <div className="  hover:text-slate-300 transition-all duration-200 ease-in-out">
                            <Link href={'/event/explore'} className="flex items-center gap-1">
                                <FaRegCalendarAlt />
                                <button className="font-bold text-sm">Buat Event</button>
                            </Link>
                        </div>
                        <div className="hover:text-slate-300 transition-all duration-200 ease-in-out">
                            <Link href="/event/explore" className="flex gap-1 items-center">
                                <FaCompass />
                                <button className="font-bold text-sm">Jelajah</button>
                            </Link>
                        </div>
                        <div className="flex gap-3 ">
                            <Link href={'/event-organizer/register'}
                                className={`py-2 hover:text-slate-300 border border-white px-5 rounded-xl transition-all duration-200 ease-in-ou`}
                            >
                                Register
                            </Link>
                            <Link href={'/event-organizer/login'}
                                className={`py-2 px-5 rounded-xl bg-blue-700 hover:bg-blue-800 transition-all duration-200 ease-in-out`}
                            >
                                Masuk
                            </Link>
                        </div>
                    </div>
                </section>
            </nav>
        </>
    );
};
