export default function SearchEventInput({ debounceSearch }: any) {
    return (
        <div className='relative w-full'>
            <input
                type="text"
                placeholder="Search events..."
                className="w-full py-2 border px-2 border-gray-300 rounded"
                onChange={(e) => debounceSearch(e.target.value)}
            />
        </div>
    )
}