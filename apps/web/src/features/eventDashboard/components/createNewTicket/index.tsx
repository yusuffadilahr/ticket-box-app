'use client'

import CreateTicket from "./../../../../components/eventDashboard/createTicket";
import { ErrorMessage } from "formik";

export default function CreateNewTicket({ isPaid, setFieldValue, values }:any) {
    return (
        <div className=" px-2 lg:px-40 rounded-xl  mt-8 h-fit w-full border border-gray-200 shadow-lg p-5">
            <h3 className="flex justify-center font-bold text-2xl mt-8 pb-5">
                Tambah Tiket Baru
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <CreateTicket
                    isPaid={isPaid}
                />
            </div>
            <button
                type="button"
                onClick={() => {
                    setFieldValue('tickets', [...values.tickets, {
                        price: values.price,
                        ticketName: values.ticketName,
                        ticketType: values.ticketType,
                        seatAvailable: values.seatAvailable,
                        discount: values.discount,
                        startDate: values.startDate,
                        endDate: values.endDate,
                    }]);
                }}
                className="bg-blue-500 text-white rounded-md p-3 mt-4 flex justify-center"
            >

                Tambah Tiket
            </button>
            <ErrorMessage name="tickets" component="div" className='text-xs text-red-600' />
        </div>
    )
}