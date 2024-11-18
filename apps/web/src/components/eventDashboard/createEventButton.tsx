import Link from "next/link"

export default function CreateEventButton() {
    return (
        <Link href="/event/dashboard/c" className='flex items-center px-4 font-bold text-white drop-shadow-lg bg-blue-500 rounded-lg hover:bg-blue-700 transition-all duration-300'>
            <h1 className="font-semibold">
                + Buat Event
            </h1>
        </Link>
    )
}