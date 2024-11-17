import Link from "next/link"
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';

export default function EventInfo({ queryDataDetailEvent }:any) {
    return (
        <div className="flex flex-col gap-5 flex-grow">
            <div>{queryDataDetailEvent?.eventName}</div>
            <div className="space-y-5 mb-4">
                <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <div className="text-base font-normal">
                        {queryDataDetailEvent?.startEvent.split('T')[0]} s/d{' '}
                        {queryDataDetailEvent?.endEvent.split('T')[0]}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <MdOutlineAccessTimeFilled />
                    <div className="text-base font-normal">
                        {queryDataDetailEvent?.startEvent
                            .split('T')[1]
                            .split('.')[0]
                            .slice(0, -3)}{' '}
                        s/d{' '}
                        {queryDataDetailEvent?.endEvent
                            .split('T')[1]
                            .split('.')[0]
                            .slice(0, -3)}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <IoLocationSharp />
                    <div className="text-base font-normal">
                        <Link target='_blank' href={`${queryDataDetailEvent?.locationUrl}`}>
                            {queryDataDetailEvent?.location}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}