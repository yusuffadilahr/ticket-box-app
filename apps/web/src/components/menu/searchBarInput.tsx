"use client"
import { FaSearch } from 'react-icons/fa';


export default function SearchBarInput({ inputRef, setIsBlur, debounce }: any) {
    return (
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
    )
}