import { FaMagnifyingGlass } from 'react-icons/fa6';


export default function SearchFilterEvent({ debounce }: any) {
    return (
        <div className="relative flex justify-end py-5">
            <input
                type="text"
                onChange={(e) => debounce(e.target.value)}
                placeholder="Search..."
                className="border px-4 py-2 pr-10 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FaMagnifyingGlass />
            </div>
        </div>
    )
}