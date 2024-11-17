"use client"
import { FaSearch } from 'react-icons/fa';


export default function SearchBarSuggestion({ querySearchData, router, setValueInput }: any) {
    return (
        <div className="flex flex-col">
            <div className="w-full px-4 py-5">
                <h1 className="border-b-4 border-yellow-500 pb-3">
                    Hasil Penelusuran
                </h1>
            </div>
            {querySearchData?.map((item: any, index: any) => {
                return (
                    <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                        onClick={() => {
                            router.push(
                                `/event/explore/${item.id}TBX${item.startEvent.split('T')[0].split('-').join('')} ${item.eventName.toLowerCase().split(' ').join('-')}`,
                            );
                            setValueInput('');
                        }}
                    >
                        <div className="grid grid-cols-2">
                            <h1 className="text-sm">
                                {item?.eventName} - {item?.location}
                            </h1>
                            <div className="w-full flex justify-end">
                                <h1 className="text-sm">
                                    Rp.{' '}
                                    {item?.tickets[0]?.price.toLocaleString('id-ID')}
                                </h1>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}