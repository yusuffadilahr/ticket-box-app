import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from 'react-icons/md';


export default function TicketList({ values, setFieldValue }:any) {
    return (
    <>
        {
            values.tickets.map((ticket: any, index: any) => (
                <div key={index} className="bg-blue-50 p-4 mb-2 rounded-lg border border-blue-200 shadow-md w-full mx-auto">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold">
                                {ticket.ticketName}
                            </h3>
                            <p className="text-gray-600 mt-1">
                                {ticket.ticketType}
                            </p>
                            <div className="text-blue-600 mt-2">
                                <span className="flex items-center flex-col">
                                    <div className='flex items-center gap-1'>
                                        <MdOutlineAccessTimeFilled />
                                        Start : {ticket.startDate.split('T')[0]} • {ticket.startDate.split('T')[1]}
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <MdOutlineAccessTimeFilled />
                                        End : {ticket.endDate.split('T')[0]} • {ticket.endDate.split('T')[1]}
                                    </div>
                                </span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                const updatedTickets = values.tickets.filter((_: any, i: any) => i !== index);
                                setFieldValue('tickets', updatedTickets);
                            }}
                            className="text-red-500"
                        >
                            <FaRegTrashAlt />
                        </button>
                    </div>
                    <hr className="my-4 border-blue-300 border-dashed" />
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-semibold">
                            {ticket.discount > 0 ? (
                                <div>
                                    <span className="line-through mr-2 text-gray-500">Rp{ticket.price.toLocaleString("id-ID")}</span>
                                    <span className="text-red-600">
                                        Rp{(ticket.price - ticket.discount).toLocaleString("id-ID")}                                                    </span>
                                </div>
                            ) : (
                                `Rp${ticket.price.toLocaleString("id-ID")}`
                            )}
                        </p>
                        <div className="flex items-center space-x-4">
                            Seat Available : {ticket.seatAvailable}
                        </div>
                    </div>
                </div>


            ))
            }
        </>
    )
}