"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation';

export default function RegisterButton({ pathname, color }: { pathname: String, color: String }) {
    return (
        <Link
            href={'/user/register'}
            className={`py-2 hover:text-slate-300 border border-${color} px-5 rounded-xl transition-all duration-200 ease-in-ou ${pathname.startsWith('/event-organizer/login') ? 'hidden' : 'block'}`}
        >
            Register
        </Link>
    )
}