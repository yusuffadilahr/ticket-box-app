"use client"

import Link from "next/link"
import { FaCompass } from 'react-icons/fa';


export default function JelajahButton({ size }: { size :Number}) {
    return (
        <div className="hover:text-slate-300 transition-all duration-200 ease-in-out">
            <Link href="/event/explore" className="flex gap-1 items-center">
                <FaCompass />
                <button className={`font-bold text-${size}`}>Jelajah</button>
            </Link>
        </div>
    )
}