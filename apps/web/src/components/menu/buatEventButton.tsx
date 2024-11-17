"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation';
import { FaRegCalendarAlt } from 'react-icons/fa';


export default function BuatEventButton({size, handleRedirectToOrganizerPage }:any) {
    return (
        <div className="  hover:text-slate-300 transition-all duration-200 ease-in-out">
            <div className="flex items-center gap-1">
                <FaRegCalendarAlt />
                <button
                    onClick={handleRedirectToOrganizerPage}
                    className={`font-bold text-${size}`}
                >
                    Buat Event
                </button>
            </div>
        </div>
    )
}