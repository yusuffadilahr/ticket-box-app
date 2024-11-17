"use client"

import Link from "next/link"

export default function LoginButton({pathname}:any) {
    return (
        <Link
            href={'/user/login'}
            className={`py-2 px-5 rounded-xl text-white bg-blue-700 hover:bg-blue-800 transition-all duration-200 ease-in-out ${pathname.startsWith('/event-organizer/login') ? 'hidden' : 'block'}`}
        >
            Masuk
        </Link>
    )
}